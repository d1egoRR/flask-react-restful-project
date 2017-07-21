# -*- coding: utf-8 -*-
from bson.objectid import ObjectId
from datetime import datetime

from flask import Flask, render_template
from flask.views import View
from flask_restful import Resource, Api, reqparse, abort
from pymongo import MongoClient

app = Flask('blog')
api = Api(app)

client = MongoClient('localhost', 27017)
db = client.blog
blog_posts = db.posts

parser = reqparse.RequestParser(bundle_errors=True)
parser.add_argument('title', type=str, required=True, help="title es un dato obligatorio")
parser.add_argument('author', type=str, required=True, help="author es un dato obligatorio")
parser.add_argument('text_post', type=str, required=True, help="text_post es un dato obligatorio")
parser.add_argument('comment_author')
parser.add_argument('comment_text')


class PostCreate(View):
    def __init__(self, template_name):
        self.template_name = template_name

    def dispatch_request(self):
        return render_template(self.template_name)

app.add_url_rule(
    '/posts/create',
    view_func=PostCreate.as_view('show_posts', 'index.html'))


class PostList(Resource):
    def get(self):
        posts = blog_posts.find()
        post_list = []
        for post in posts:
            post['_id'] = str(post['_id'])
            post['date'] = str(post['date'])
            post_list.append(post)
        return post_list


class PostAdd(Resource):
    def post(self):
        args = parser.parse_args()
        if args['title'] == '' or args['author'] == '' or args['text_post'] == '':
            return {'result': False}

        post = {}
        post['title'] = args['title']
        post['author'] = args['author']
        post['text_post'] = args['text_post']
        post['date'] = datetime.utcnow()

        blog_posts.insert_one(post)
        return {'result': True}

class Post(Resource):
    def get(self, post_id):
        if not ObjectId.is_valid(post_id):
            return {'message': 'El ID no es valido.'}

        post = blog_posts.find_one({"_id": ObjectId(post_id)})

        if post is None:
            return {'message': 'No existe el post.'}

        post['_id'] = str(post['_id'])
        post['date'] = str(post['date'])
        return post

    def put(self, post_id):
        args = parser.parse_args()
        query = {'_id': post_id}, {'author': 'gente'}
        blog_posts.update_one(query)

        return True


api.add_resource(PostList, '/api/posts')
api.add_resource(PostAdd, '/api/posts/add')
api.add_resource(Post, '/api/posts/<string:post_id>')

if __name__ == '__main__':
    app.run(debug=True)