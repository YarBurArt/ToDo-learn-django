# Django-ToDo:learn

![image](https://images.unsplash.com/photo-1562841609-5a5e39a7d28d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)

Todo ...

## Project description

Todo is a to-do list application that allows users to create a list of tasks that they need to complete. The project also includes several microservices, such as weather, check-in and blogging. A full CRUD is found in various forms. 

There is also a frontend on react with dynamic loading from DRF, but it's done in an interesting way for the purpose of understanding react. 
## Install

To work with the project, you will need to:

1. Install Python 3.10 and Django 3.x on your computer

1,5. Create a virtual environment via virtualenv (although I find it more convenient via konda)

2. Clone the repository into a local folder on your computer:


`git clone https://github.com/YarBurArt/ToDo-learn-django.git`

_OR SSH_ 

`git clone git@github.com:YarBurArt/ToDo-learn-django.git`

3. Install all dependencies by running the following commands:


`cd ToDo-learn-django`

`pip install -r requirements.txt`

## Using

To start the server, execute

`python manage.py runserver`

Open your browser and go to the address http://127.0.0.1:8000/

## TODO
- normal design
- optimization 
- linking account and notes 
- test coverage

If you find any bugs or want to suggest new features, please create a new issue (but this only concerns critical bugs)
