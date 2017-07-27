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


class TestPost(unittest.TestCase):
    def setUp(self):
        self.app = app.app.test_client()
        self.post_id = '596e7ba15265ab2bd33bfaba'
        self.post_id_no_exist = '706e7ba15265ab2bd33bfaba'
        self.post_id_no_valid = '596e7ba15265ab2bd33bfabacd'
        self.page = 1
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
        response = self.app.get('/api/postslist/' + str(self.page))
        result = json.loads(response.get_data())
        self.assertEqual(len(result), 2)
        self.assertEqual(result['posts'][0]['title'], 'Title Test')
        self.assertEqual(result['posts'][0]['author'], 'Test')

    def test_get_postslist_pagination(self):
        for x in range(1, 22):
            post = {'title': str(x), 'date': datetime.utcnow()}
            app.blog_posts.insert_one(post)

        response = self.app.get('/api/postslist/' + str(self.page))
        result = json.loads(response.get_data())
        self.assertEqual(len(result['posts']), 5)
        self.assertEqual(result['posts'][0]['title'], 'Title Test')
        self.assertEqual(result['posts'][4]['title'], '3')

        self.page = 3
        response = self.app.get('/api/postslist/' + str(self.page))
        result = json.loads(response.get_data())
        self.assertEqual(len(result['posts']), 5)
        self.assertEqual(result['posts'][0]['title'], '9')
        self.assertEqual(result['posts'][4]['title'], '13')

        self.page = 5
        response = self.app.get('/api/postslist/' + str(self.page))
        result = json.loads(response.get_data())
        self.assertEqual(len(result['posts']), 3)
        self.assertEqual(result['posts'][0]['title'], '19')
        self.assertEqual(result['posts'][2]['title'], '21')

        self.page = 6
        response = self.app.get('/api/postslist/' + str(self.page))
        result = json.loads(response.get_data())
        self.assertEqual(len(result['posts']), 0)

        self.page = 0 # devuelve primer pagina
        response = self.app.get('/api/postslist/' + str(self.page))
        result = json.loads(response.get_data())
        self.assertEqual(len(result['posts']), 5)
        self.assertEqual(result['posts'][0]['title'], 'Title Test')
        self.assertEqual(result['posts'][4]['title'], '3')

    def test_get_with_param_id(self):
        response = self.app.get('/api/posts/' + self.post_id_no_valid)
        result = json.loads(response.get_data())
        self.assertEqual(result['message'], 'El ID no es valido.')

        response = self.app.get('/api/posts/' + self.post_id_no_exist)
        result = json.loads(response.get_data())
        self.assertEqual(result['message'], 'No existe el post.')

        response = self.app.get('/api/posts/' + self.post_id)
        result = json.loads(response.get_data())
        self.assertEqual(result['title'], 'Title Test')
        self.assertEqual(result['author'], 'Test')

    def test_post_add(self):
        response = self.app.post('/api/posts/add')
        result = json.loads(response.get_data())
        self.assertFalse(result['result'])
        self.assertEqual(result['message'], 'Titulo, autor y post son obligatorios')

        post = dict(title='titulo post', text_post='texto post', author='test_author')
        response = self.app.post('/api/posts/add', data=post)
        result = json.loads(response.get_data())
        self.assertTrue(result['result']) # se guardo OK

        response = self.app.get('/api/postslist/' + str(self.page))
        result = json.loads(response.get_data())
        self.assertEqual(len(result['posts']), 3)
        self.assertEqual(result['posts'][2]['title'], 'titulo post')
        self.assertEqual(result['posts'][2]['author'], 'test_author')

    def test_put(self):
        response = self.app.put('/api/posts/' + self.post_id)
        result = json.loads(response.get_data())
        self.assertFalse(result['result'])
        self.assertEqual(result['message'], 'Titulo, autor y post son obligatorios')

        post = dict(title='titulo modificado', text_post='texto modificado', author='author modificado')
        response = self.app.put('/api/posts/' + self.post_id_no_exist, data=post)
        result = json.loads(response.get_data())
        self.assertFalse(result['result']) # ID NO EXISTENTE

        response = self.app.put('/api/posts/' + self.post_id_no_valid, data=post)
        result = json.loads(response.get_data())
        self.assertEqual(result['message'], 'El ID no es valido.')

        response = self.app.put('/api/posts/' + self.post_id, data=post)
        result = json.loads(response.get_data())
        self.assertTrue(result['result']) # TODO OK

        response = self.app.get('/api/posts/' + self.post_id)
        result = json.loads(response.get_data())
        self.assertEqual(result['title'], 'titulo modificado')
        self.assertEqual(result['author'], 'author modificado')

    def test_delete(self):
        response = self.app.delete('/api/posts/' + self.post_id_no_valid)
        result = json.loads(response.get_data())
        self.assertFalse(result['result'])
        self.assertEqual(result['message'], 'El ID no es valido.')

        response = self.app.delete('/api/posts/' + self.post_id_no_exist)
        result = json.loads(response.get_data())
        self.assertFalse(result['result'])

        response = self.app.delete('/api/posts/' + self.post_id)
        result = json.loads(response.get_data())
        self.assertTrue(result['result'])

        response = self.app.get('/api/postslist/' + str(self.page))
        result = json.loads(response.get_data())
        self.assertEqual(len(result['posts']), 1)

        response = self.app.get('/api/posts/' + self.post_id)
        result = json.loads(response.get_data())
        self.assertEqual(result['message'], 'No existe el post.')


class TestComment(unittest.TestCase):
    def setUp(self):
        self.app = app.app.test_client()
        self.post_id = '596e7ba15265ab2bd33bfaba'
        self.post_id_no_exist = '706e7ba15265ab2bd33bfaba'
        self.post_id_no_valid = '596e7ba15265ab2bd33bfabacd'
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

    def test_put(self):
        response = self.app.put('/api/comments/add/' + self.post_id_no_valid)
        result = json.loads(response.get_data())
        self.assertFalse(result['result'])
        self.assertEqual(result['message'], 'El ID no es valido.')

        response = self.app.put('/api/comments/add/' + self.post_id)
        result = json.loads(response.get_data())
        self.assertFalse(result['result'])
        self.assertEqual(result['message'], 'Comentario y autor son obligatorios')

        comment = dict(comment_author='test', comment_text='text test')
        response = self.app.put('/api/comments/add/' + self.post_id_no_exist, data=comment)
        result = json.loads(response.get_data())
        self.assertFalse(result['result'])
        self.assertEqual(result['message'], 'No existe el post.')

        response = self.app.put('/api/comments/add/' + self.post_id, data=comment)
        result = json.loads(response.get_data())
        self.assertTrue(result['result'])


if __name__ == '__main__':
    unittest.main()