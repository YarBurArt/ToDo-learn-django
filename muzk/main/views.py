from django.shortcuts import render


def index(request):
    return render(request, "main/index.html")


def about(request):
    return render(request, "main/about.html")


def contact(request):
    contacts = [{'url': 'https://vk.com/yarburart',
                 'name': 'Вконтакте', 'add_i': 'связь со мной'},
                {'url': 'https://github.com/yarburart',
                 'name': 'GitHub', 'add_i': 'проекты программирования'},
                {'url': 'https://instagram.com/yarburart',
                 'name': 'Instagram', 'add_i': 'проекты цифрового искусства'}]

    return render(request, "main/cont.html", context={'contacts': contacts})
