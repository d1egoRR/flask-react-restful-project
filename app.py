# -*- coding: utf-8 -*-
from bson.objectid import ObjectId
from datetime import datetime

from flask import Flask, render_template, jsonify
from flask_restful import Resource, Api, reqparse, abort
from pymongo import MongoClient

from helper.crossdomain import crossdomain

app = Flask('blog')
api = Api(app)

client = MongoClient('localhost', 27017)
db = client.blog
blog_posts = db.posts

parser = reqparse.RequestParser(bundle_errors=True)
parser.add_argument('title', type=str)
parser.add_argument('author', type=str)
parser.add_argument('text_post', type=str)
parser.add_argument('comment_author', type=str)
parser.add_argument('comment_text', type=str)


class PostList(Resource):
    @crossdomain(origin='*')
    def get(self, page):
        if page < 1:
            page = 1
        limit = 5
        skip = (page - 1) * limit
        posts = blog_posts.find().skip(skip).limit(limit)
        post_list = []
        for post in posts:
            post['_id'] = str(post['_id'])
            post['date'] = str(post['date'])
            post_list.append(post)
        return jsonify(post_list)


class PostAdd(Resource):
    def post(self):
        args = parser.parse_args()

        if not all([args['title'], args['author'], args['text_post']]):
            result = {
                'result': False,
                'message': 'Titulo, autor y post son obligatorios'}
            return jsonify(result)

        post = {}
        post['title'] = args['title']
        post['author'] = args['author']
        post['text_post'] = args['text_post']
        post['date'] = datetime.utcnow()

        blog_posts.insert_one(post)
        result = {'result': True}
        return jsonify(result)

class Post(Resource):
    @crossdomain(origin='*')
    def get(self, post_id):
        if not ObjectId.is_valid(post_id):
            result = {
                'result': False,
                'message': 'El ID no es valido.'}
            return jsonify(result)

        post = blog_posts.find_one({"_id": ObjectId(post_id)})

        if post is None:
            result = {
                'result': False,
                'message': 'No existe el post.'}
            return jsonify(result)

        post['_id'] = str(post['_id'])
        post['date'] = str(post['date'])
        return jsonify(post)

    def put(self, post_id):
        args = parser.parse_args()

        if not ObjectId.is_valid(post_id):
            result = {
                'result': False,
                'message': 'El ID no es valido.'}
            return jsonify(result)

        if not all([args['title'], args['author'], args['text_post']]):
            result = {
                'result': False,
                'message': 'Titulo, autor y post son obligatorios'}
            return jsonify(result)

        filter_query = {'_id': ObjectId(post_id)}
        update_query = {'$set': {
                            'title': args['title'],
                            'author': args['author'],
                            'text_post': args['text_post']}}

        result = blog_posts.update_one(filter_query, update_query)
        result = {'result': result.modified_count > 0}
        return jsonify(result)

    def delete(self, post_id):
        if not ObjectId.is_valid(post_id):
            result = {
                'result': False,
                'message': 'El ID no es valido.'}
            return jsonify(result)

        result = blog_posts.delete_one({'_id': ObjectId(post_id)})
        result = {'result': result.deleted_count > 0}
        return jsonify(result)


api.add_resource(PostList, '/api/postslist/<int:page>')
api.add_resource(PostAdd, '/api/posts/add')
api.add_resource(Post, '/api/posts/<string:post_id>')


class CommentAdd(Resource):
    def put(self, post_id):
        args = parser.parse_args()

        if not ObjectId.is_valid(post_id):
            result = {
                'result': False,
                'message': 'El ID no es valido.'}
            return jsonify(result)

        if not all([args['comment_author'], args['comment_text']]):
            result = {
                'result': False,
                'message': 'Comentario y autor son obligatorios'}
            return jsonify(result)

        post = blog_posts.find_one({"_id": ObjectId(post_id)})

        if post is None:
            result = {
                'result': False,
                'message': 'No existe el post.'}
            return jsonify(result)

        new_comment = {
            'author': args['comment_author'],
            'text_comment': args['comment_text'],
            'date': datetime.utcnow()}

        result = blog_posts.update_one(
            {"_id": ObjectId(post_id)},
            {'$push': {'comments': new_comment}})

        result = {'result': result.modified_count > 0}
        return jsonify(result)

api.add_resource(CommentAdd, '/api/comments/add/<string:post_id>')

if __name__ == '__main__':
    app.run(debug=True)