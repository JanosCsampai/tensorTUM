## Django & React & SQLite & Azure CustomVision
<img src="image (3).png">


##  TechStack Overview
 - Django Rest Framework with SQLite Database (for Production we can use PostgreSQL on Azure)
 - Database with User Data, Statistics, X-Ray Images
 - Seperate ReactJS Application with User Login (JWT Tokens saved on the database)
 - Azure CustomVision model for classifying medical images

##  Login for provided local SQLite Database
Email: admin@mail.com
Password: admin12345  

### Short Instruction
##### Inside frontend folder: 
1. `npm install`
2. `npm run`

##### Inside backend folder: 
1. create a virtual enviroment inside backend/venv
1. install requirements.txt on the enviroment
2. run django server via `py manage.py runserver`

