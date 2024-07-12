## CONTENTS:
- Jobert's Quick Start Guide
- Explanation for the folders [oh wow this is bare]
- Other stuff that you guys want to put in here [also bare]

Jobert's Quick Start Guide:

Pre-requisite: Install Node.js v.20.14.0

## Installing npm packages (backend):

1. CD into folder. 

2. Use the command below to install all packages:
   ``` "npm install bcrypt cookie-parser dotenv express-fileupload express-session express jsonwebtoken mongoose nodemon validator" ```

3. Run using command
   ``` "npm run dev" ```

# Congrats! It should be up and running now!


(Optional)
3. Download and install postman from postman.com/downloads/
    3a. https://youtu.be/8DploTqLstE?list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&t=715
    3* Use the link above to learn how to use postman

# Minor notes:
- Forgot to implement not being able to add a cafe if you already have one as an owner, oops
- Ah yeah I think we bit off more than we can chew using react so we had to revert back to basic jquery hbs
- as a result some pages/css might not be working to its fullest but we'll work on it promise hehe
- It should just automatically connect to the mongodb in atlas
    - Not putting .env in the .gitignore file or else we won't be able to access the db
- Check the acc creds.txt file for sample users to login with
