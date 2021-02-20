# todo-app-react-django
Simple ToDo desktop app developed using Electron, React and Django Rest Framework. Allows to create, retrieve, update and delete ToDos, upload .csv and export data and manage todos' state in a ToDo board. JavaScript; Electron framework to build stand-alone desktop app. React atomic design, CSS-in-JS with Styled Components; adaptative web design using mobile first approach; Python, Django Rest Framework

# Local web app
## To run react app, in "Frontend" directory:
### Run "npm i" ou "yarn install" to install the required dependencies
### Run "npm run start" to run de project in dev mode

## To run Django project,
### Run .\Scripts\activate in root directory to activate virtual environment
### Run "python manage.py runserver" in the "Backend" directory

# Local desktop app
## To run react app, in "Frontend" directory:
### Run "npm i" ou "yarn install" to install the required dependencies
### Run "npm run start-electron" to run the desktop app  in dev mode or "npm run electron-dev" to concurrently run react app in the browser and electron

## To run Django project,
### Run .\Scripts\activate in root directory to activate virtual environment
### Run "python manage.py runserver" in the "Backend" directory

# Standalone desktop app

### Build Django executable by running "pyinstaller --name=backend  backend/manage.py"
### Run ".\dist\backend\backend.exe runserver --noreload" to run the executable by itself or copy the "dist" folder to "frontend" directory and rename it to "dist-django", so a child process in electron runs the executable of Django server

## To run electron, in "Frontend" directory:
### Run "npm i" ou "yarn install" to install the required dependencies
### Run "npm run start-electron" to locally run the desktop app in dev mode 
### Run "npm run electron-build" to generate an app installer and an unpacked standalone app.
#### for winmac,  run  "npm run electron-build-win" 
#### for mac,  run  "npm run electron-build-mac" 
#### for linux,  run  "npm run electron-build-linux" 