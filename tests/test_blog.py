# -*- coding: utf-8 -*-
import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

import json
import unittest

from bson.objectid import ObjectId
from datetime import datetime
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

    def test_get_postslist(self):
        response = self.app.get('/api/posts')
        result = json.loads(response.get_data())
        self.assertEqual(len(result), 2)
        self.assertEqual(result[0]['title'], 'Title Test')
        self.assertEqual(result[0]['author'], 'Test')

    def test_get_with_param_id(self):
        response = self.app.get('/api/posts/606e7ba15265ab2bd33bfabxx')
        result = json.loads(response.get_data())
        self.assertEqual(result['message'], 'El ID no es valido.')

        response = self.app.get('/api/posts/706e7ba15265ab2bd33bfaba')
        result = json.loads(response.get_data())
        self.assertEqual(result['message'], 'No existe el post.')

        response = self.app.get('/api/posts/606e7ba15265ab2bd33bfaba')
        result = json.loads(response.get_data())
        self.assertEqual(result['title'], 'Title Test 2')
        self.assertEqual(result['author'], 'Test2')

    def test_post_save(self):
        response = self.app.post('/api/posts/add')
        result = json.loads(response.get_data())
        self.assertIn('title', result['message'])
        self.assertIn('author', result['message'])
        self.assertIn('text_post', result['message'])
        self.assertEqual(result['message']['title'], 'title es un dato obligatorio')

        post = dict(title='titulo post', text_post='texto post')
        response = self.app.post('/api/posts/add', data=post)
        result = json.loads(response.get_data())
        self.assertIn('author', result['message'])
        self.assertEqual(result['message']['author'], 'author es un dato obligatorio')

        post['author'] = ''
        response = self.app.post('/api/posts/add', data=post)
        result = json.loads(response.get_data())
        self.assertFalse(result['result']) # author en blanco

        post['author'] = 'test_author'
        response = self.app.post('/api/posts/add', data=post)
        result = json.loads(response.get_data())
        self.assertTrue(result['result']) # se guardo OK

        response = self.app.get('/api/posts')
        result = json.loads(response.get_data())
        self.assertEqual(len(result), 3)
        self.assertEqual(result[2]['title'], 'titulo post')
        self.assertEqual(result[2]['author'], 'test_author')

    def test_put_with_param_id(self):
        post = dict(title='titulo post', text_post='texto post', author='na')
        response = self.app.put('/api/posts/596e7ba15265ab2bd33bfabf', data=post)
        result = json.loads(response.get_data())
        print result

if __name__ == '__main__':
    unittest.main()