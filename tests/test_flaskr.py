import flask_react_blog
import unittest

class FlaskrTestCase(unittest.TestCase):

    def setUp(self):
        flaskr.app.testing = True
        self.app = flaskr.app.test_client()

    def tearDown(self):
        pass

if __name__ == '__main__':
    unittest.main()