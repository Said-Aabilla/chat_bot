# Chatbot Deployment with Flask and JavaScript

In this project we deploy the chatbot we created with Flask and JavaScript.

Deployed within Flask app with jinja2 template

## Initial Setup:

Clone repo and create a virtual environment
```
$ git clone git@github.com:Said-Aabilla/chat_bot.git
$ cd chat_bot
$ python3 -m venv venv
$ . venv/bin/activate
```
Install dependencies
```
$ (venv) pip install Flask torch torchvision nltk
```
Install nltk package
```
$ (venv) python
>>> import nltk
>>> nltk.download('punkt')
```
Modify `intents.json` with different intents and responses for your Chatbot

Run
```
$ (venv) python train.py
```
This will dump data.pth file. And then run
the following command to test it in the console.
```
$ (venv) python chat.py
```

For deployment implement `app.py` and `app.js`.