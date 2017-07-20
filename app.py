# -*- coding: utf-8 -*-
from datetime import datetime
from bson.objectid import ObjectId
from flask import Flask, render_template
from pymongo import MongoClient
from flask_restful import Resource, Api, reqparse

app = Flask('blog')
api = Api(app)

client = MongoClient('localhost', 27017)
db = client.blog
blog_posts = db.posts

parser = reqparse.RequestParser()
parser.add_argument('title')
parser.add_argument('author')
parser.add_argument('text_post')
parser.add_argument('comment_author')
parser.add_argument('comment_text')

@app.route("/posts/create")
def post_form():
    return render_template('index.html')
    

class PostList(Resource):
    def get(self):
        post_list = self.get_posts_list()
        return post_list

    def post(self):
        args = parser.parse_args()
        result = self.save_post(args)
        return result

    def get_posts_list(self):
        posts = blog_posts.find()
        post_list = []
        for post in posts:
            post['_id'] = str(post['_id'])
            post['date'] = str(post['date'])
            post_list.append(post)
        return post_list

    def save_post(self, data):
        if data['title'] == '' or data['author'] == '' or data['text_post'] == '':
            return False

        post = {}
        post['title'] = data['title']
        post['author'] = data['author']
        post['text_post'] = data['text_post']
        post['date'] = datetime.utcnow()

        blog_posts.insert_one(post)

        return True

class Post(Resource):
    def get(self, post_id):
        post = self.get_post_by_id(post_id)
        return post

    def get_post_by_id(self, post_id):
        post = blog_posts.find_one({"_id": ObjectId(post_id)})
        post['_id'] = str(post['_id'])
        post['date'] = str(post['date'])
        return post


api.add_resource(PostList, '/posts')
api.add_resource(Post, '/posts/<string:post_id>')

if __name__ == '__main__':
    app.run(debug=True)