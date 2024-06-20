CONTENTS:
- Jobert's Quick Start Guide
- Explanation for the folders
- Other stuff that you guys want to put in here

Jobert's Quick Start Guide:

Pre-requisite: Install Node.js v.20.14.0

1. CD into /backend folder. 
    1a. You can do this by by opening your terminal in vscode and "cd backend"
    1b. or opening the backend folder through explorer, right clicking, and then clicking open terminal here.
2. Install express
    2a. Do this by typing "npm install express" <-- This installs it locally to only this project folder.
3. Install nodemon
    3a. Do this by typing "npm install -g nodemon" <-- This installs it globally so that you only have to do this once for any other project you want to make
4. Install dotenv
    4a. Type "npm install dotenv" <-- Local install
    4* Doing this allows us to make use of the .env file inside the /backend folder. This is where we'll store variables that may be subject to change
        like: username, password, port number, etc.
5. Install Mongoose
    5a. Type "npm install mongoose"
(Optional)
6. Download and install postman from postman.com/downloads/
    6a. https://youtu.be/8DploTqLstE?list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&t=715
    6* Use the link above to learn how to use postman


ROUTES folder
- This is where we will put the .js files where page routing will be handled so it doesn't muck up the server.js file