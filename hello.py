from bson.objectid import ObjectId
from flask import Flask, render_template
from pymongo import MongoClient
from flask_restful import Resource, Api, reqparse

app = Flask('webflask')
api = Api(app)

client = MongoClient('localhost', 27017)
db = client.blog
blog_posts = db.posts

parser = reqparse.RequestParser()
parser.add_argument('title')
parser.add_argument('author')
parser.add_argument('text_post')
parser.add_argument('comments')
parser.add_argument('comments_author')
parser.add_argument('comments_text')
parser.add_argument('date')

@app.route("/post/nuevo")
def post_form():
    return render_template('index.html')

class PostList(Resource):
    def get(self):
        posts = blog_posts.find()
        listado = []
        for post in posts:
            listado.append({
                'id': str(post['_id']),
                'title': post['title'],
                'text_post': post['text_post'],
                'author': post['author'],
                'comments': post['comments'],
                'date': str(post['date'])
            })

        return listado

    def post(self):
        args = parser.parse_args()
        data = {
            'title': args['title'],
            'author': args['author'],
            'text_post': args['text_post'],
            'date': datetime.datetime.utcnow()
        }


        return {
            'pase1': args['title'],
            'pase2': args['author'],
            'pase3': args['text_post'],
            }

class Post(Resource):
    def get(self, post_id):
        post = blog_posts.find_one({"_id": ObjectId(post_id)})
        result = {
            'id': str(post['_id']),
            'title': post['title'],
            'text_post': post['text_post'],
            'author': post['author'],
            'comments': post['comments'],
            'date': str(post['date'])
        }

        return result


api.add_resource(PostList, '/posts')
api.add_resource(Post, '/posts/<string:post_id>')

if __name__ == '__main__':
    app.run(debug=True)