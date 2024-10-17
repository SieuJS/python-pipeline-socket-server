import socketio
from aiohttp import web
import spacy
import os
import json

# create a Socket.IO server
sio = socketio.AsyncServer()
@sio.event
async def connect(sid, environ):
    print('Client connected:', sid)

@sio.event
async def extractCrawlData(sid, arg):
    print("extract called")  # "world"
    nlp = load_model()
    doc = nlp(arg)
    entities = [(ent.label_,ent.text) for ent in doc.ents]
    response = json.dumps(entities)
    return response

@sio.event
async def disconnect(sid):
    print('Client disconnected:', sid)

# create an aiohttp web application
app = web.Application()
sio.attach(app)

def load_model():
    cwd = os.getcwd()
    model_path = os.path.join(cwd, "path_to_your_model")
    return spacy.load(model_path)


# run the web application
if __name__ == '__main__':
    web.run_app(app, port=9090)