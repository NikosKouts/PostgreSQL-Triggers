------ Build (Install Dependencies) ------
* npm install
[Optional]: sudo npm -g install nodemon

------ Launch Server ------
* node server.js

------ Launch Developer Server ------
* npm run dev


------ Files ------
1. Entry Point: ./server.js
2. API Routes: ./routes/router.js
   |_ ./routes/universities.js      (/universities/...)
   |_ ./routes/professors.js        (/professors/...)
   |_ ./routes/students.js          (/students/...)
   |_ ./routes/courses.js           (/courses/...)
   
3. Configure Database Connection: ./config.json 
