import os 


def start_project(dev_name, proj_name):
    print(f'Hi, {dev_name} huilo')  
    print(f"Now I'm going to run a project for you, mr. {dev_name} huilo")
    os.system(f"cd {proj_name} && python manage.py runserver")
    
    
if __name__ == '__main__':
    start_project('YarBurArt', 'muzk')
