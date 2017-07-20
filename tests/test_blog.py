# -*- coding: utf-8 -*-
import os
import sys
import tempfile
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

import json
import unittest
from pymongo import MongoClient

import app


class TestBlog(unittest.TestCase):
    def setUp(self):
        self.app = app.app.test_client()
        client = MongoClient('localhost', 27017)
        app.db = client.test_blog
        app.blog_posts = app.db.posts

    def tearDown(self):
      pass

    def test_get_postlist(self):
        response = self.app.get('/posts')
        result = json.loads(response.get_data())

        self.assertEqual(len(result), 1)
        self.assertEqual(result[0]['title'], 'Primer Post test')
        self.assertEqual(result[0]['author'], 'test')

if __name__ == '__main__':
    unittest.main()