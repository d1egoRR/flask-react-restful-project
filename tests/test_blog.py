# -*- coding: utf-8 -*-
import os
import sys
import tempfile
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from bson.objectid import ObjectId
from datetime import datetime
import json
import unittest
from pymongo import MongoClient

import app


class TestBlog(unittest.TestCase):
    def setUp(self):
        self.app = app.app.test_client()
        self.connect_db()
        self.insert_posts()

    def connect_db(self):
        self.client = MongoClient('localhost', 27017)
        app.db = self.client.test_blog
        app.blog_posts = app.db.posts

    def insert_posts(self):
        post1 = {
            '_id': ObjectId('596e7ba15265ab2bd33bfaba'),
            'title': 'Title Test',
            'author': 'Test',
            'text_post': 'Text Test',
            'date': datetime.utcnow()
        }

        post2 = {
            '_id': ObjectId('606e7ba15265ab2bd33bfaba'),
            'title': 'Title Test 2',
            'author': 'Test2',
            'text_post': 'Text Test 2',
            'date': datetime.utcnow()
        }

        app.blog_posts.insert_one(post1)
        app.blog_posts.insert_one(post2)

    def tearDown(self):
        self.client.drop_database('test_blog')

    def test_get_postlist(self):
        response = self.app.get('/posts')
        result = json.loads(response.get_data())

        self.assertEqual(len(result), 2)
        self.assertEqual(result[0]['title'], 'Title Test')
        self.assertEqual(result[0]['author'], 'Test')

    def test_get_with_param_id(self):
        response = self.app.get('/posts/606e7ba15265ab2bd33bfaba')
        result = json.loads(response.get_data())

        self.assertEqual(result['title'], 'Title Test 2')
        self.assertEqual(result['author'], 'Test2')

if __name__ == '__main__':
    unittest.main()