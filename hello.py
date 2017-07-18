from flask import Flask, render_template
from pymongo import MongoClient
from flask_restful import Resource, Api

app = Flask('webflask')
api = Api(app)

client = MongoClient('localhost', 27017)    #Configure the connection to the database
db = client.webflask    #Select the database
users_mongo = db.users #Select the collection

class HelloWorld(Resource):
    def get(self):
      users = users_mongo.find()
      #listado = []
      listado = {}
      for user in users:
        #listado.append({'name': user['name']})
        listado['name'] = user['name']
      return listado

api.add_resource(HelloWorld, '/sample')

if __name__ == '__main__':
    app.run(debug=True)