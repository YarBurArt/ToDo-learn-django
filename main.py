import os 


def start_project(name):
    print(f'Hi, {name} huilo')  
    print(f"Now I'm going to run a project for you, mr. {name} huilo")
    os.system("cd muzk && python manage.py runserver")
    
    
if __name__ == '__main__':
    start_project('YarBurArt')
