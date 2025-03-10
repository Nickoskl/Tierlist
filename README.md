<h1 align="center" id="title">TierList 📃</h1>

<p id="description">For my first project I chose to make a seemingly simple project focusing on the Back-end while trying out VUE with its virtual DOM on the <a href="https://github.com/Nickoskl/Tierlist-Front-End.git">Front-end Repo Here </a>.</p>

<h2 align="center">🚀 Demo</h2>

<p align="center"><a href="https://urltobeupdated">https://urltobeupdated</a></p>

<h2 align="center">🛠️ Tech Stack</h2>

<p align="center">
  <a href="https://nodejs.org/" target="_blank">
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
  <a href="https://vuejs.org/" target="_blank">
    <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue.js" />
  </a>
  <a href="https://expressjs.com/" target="_blank">
    <img src="https://img.shields.io/badge/Express.js-FFF82A?style=for-the-badge&logo=express&logoColor=black" alt="Express.js" />
  </a>
  <a href="https://www.mongodb.com/" target="_blank">
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  </a>
  <a href="https://imgur.com/" target="_blank">
    <img src="https://img.shields.io/badge/Imgur API-1BB76E?style=for-the-badge&logo=imgur&logoColor=white" alt="Imgur" />
  </a>
  <a href="https://www.npmjs.com/package/cookie-parser" target="_blank">
    <img src="https://img.shields.io/badge/Cookie_Parser-000000?style=for-the-badge&logo=npm&logoColor=white" alt="Cookie Parser" />
  </a>
  <a href="https://axios-http.com/" target="_blank">
    <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" />
  </a>
</p>


<h2>🧐 Features</h2>


*   🔒  [Authentication](https://github.com/Nickoskl/Tierlist/blob/main/src/helpers/index.ts) with Salt Crypto secret and password
*   📷  [Photo upload](https://github.com/Nickoskl/Tierlist/blob/main/src/api/imgur.ts), get and delete using external API (Imgur)
*   ⏲  User sessions and session logout
*   🔗  [Image serve from API link with buffer](https://github.com/Nickoskl/Tierlist/blob/main/src/controllers/imgur.ts) rather from Imgur link hiding original ID
*   🦸‍♀️  Super users with logout, edit and page view privileges
*   🙄  [A checksum](https://github.com/Nickoskl/Tierlist/blob/main/src/helpers/index.ts) for data validation that I ended up not using
*   ➕  Multiple different actions (verified both on front/back-end) based on profile permissions such as
    + Admins
      + Can edit, delete any user
      + Can see superuser and session status of the users and invalidate them
      + Cave a useful view that can see all registered users
      + Can create Templates for users to edit and order them.
      + Can edit and delete any user Tierlist.
    + Users
      + Can create Tierlists from the admin Templates
      + Can see user profiles and their tierlists
      + Can edit and delete their own tierlists

<h2>💖Like my work?</h2>

Any feedback is appreciated. You can email me any suggestions or improvements so I can use them in any future projects.  
I have documented some [improvements here](https://github.com/Nickoskl/Tierlist/blob/82236bc875a3830274f5a9a7b36e4e2def0a5e44/To%20improve%20on.txt) that I plan on implementing on my next project but any addition is welcome<br>Thank you



<h2># To Be Updated Project Screenshots:</h2>

<img src="./UI%20Designs/admin%20menu.png" alt="project-screenshot" width="550" height="300/">

<img src="./UI%20Designs/profile.png" alt="project-screenshot" width="550" height="300/">

  
  <h2>🛠️ Try it yourself:</h2>

<p>You will need</p>

```
1. A mongoDB database
2. An Imgur account and a registered app associated with it,
3. Node JS etc..
```

<p>1. create the .env file</p>

```
#Mine Looks Like this#
MONGO_URL=<#YOUR DATABASE URL>
CRYPTO_SECRET= <#A RANDOM SECRET STRING FOR CRYPTO>
IMGUR_BEARER = <#A BEARER TOKEN THAT YOU CAN CREATE BY USING POSTMAN TO LOGIN WITH 0AUTH ON IMGUR API, MY VALUE LOOKS LIKE THIS: Bearer <#RANDOM_STRING#>>
IMGUR_Username = <#YOUR IMGUR USERNAME>
IMGUR_Album_Hash = <#THE ALBUM HASH FOR THE IMAGES TO BE UPLOADED TO>
IMGUR_Client_Id = <#AND YOUR CLIENT ID>
```

<p>2. Clone the repo and</p>


```
npm i
npm run start
```



<h2>🛡️ License:</h2>

This project is licensed under the Apache License Version 2.0 January 2004 http://www.apache.org/licenses/

