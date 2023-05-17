
# PetMate [Veterinary Appointment Booking System]

![image](https://i.ibb.co/R4x3XMm/petmate-logo.png)

PetMate is a user-friendly web application designed to simplify the process of scheduling appointments with veterinarians. The app enables pet owners to quickly and easily book appointments with their preferred veterinarian, and provides veterinarians with a centralized system for managing their appointments.

In addition to appointment scheduling, PetMate also includes an "open slots" feature that allows veterinarians to specify their availability for appointments. This feature enables pet owners to view available appointment slots for their preferred veterinarian and select a time that works best for them.

> Work In Progress For Converting the Frontend In React-Typescript , Please Find the first version on this branch => [Version-1](https://github.com/KanadeAditya/PetMate-Appointment-Booking-System/tree/version-1)

## Demo Links

> [Petmate App (netlify link)](https://pet-mate-veterinary.netlify.app/)  

> [NoSql Server for Read heavy operations](https://encouraging-fox-veil.cyclic.app/)

> [SQL Server for Appointment Booking Logic](https://dark-lime-clownfish-wear.cyclic.app/)

> [O-Auth Server ](https://salmon-coral-gear.cyclic.app/)
## Authors

- [Kanade Aditya](https://www.github.com/octokatherine)
- [Yuvraj Maharshi](https://github.com/Yuvraj1307)
- [Ayush Kr Shanu](https://github.com/Ayush-kr-shanu)
- [Shubham Kumar](https://github.com/shubhamprakash911)
- [Chandan Kumar](https://github.com/Vchandankumarr)




## Backend Deployment

To deploy this project run following commands on Backend folders ,
You need to run two servers in Backend folder 

One is `Backend/NoSqlServer` and other is  `Backend/SQL-Server`
For O-auth there is another server which is live on this  [link](https://salmon-coral-gear.cyclic.app/)

```bash
  npm install
```

```bash
  npm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
* Backend/NoSqlServer : 

    `JWT_SECRET_KEY`

    `JWT_SECRET_REFRESH`

    `URL` - - Mongo DB URL

    `port`

    `redisURL` - Redis cloud url 
               
*  Backend/SQL-Server   

    `DB_USER` - SQL DB username

    `DB_Name` - SQL database name eg. appointment-slots

    `DB_Pass` - SQL DB password

    `port`

    `DB_host`   - SQL DB host eg. localhost if you are running locally

    `JWT_SECRET_KEY`

    `JWT_SECRET_REFRESH`

    `MongoURL`  - Mongo DB URL

## Tech Stack

  <div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="60" width="72" alt="typescript logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="60" width="72" alt="javascript logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="60" width="72" alt="html5 logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="60" width="72" alt="css3 logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="60" width="72" alt="nodejs logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" height="60" width="72" alt="express logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" height="60" width="72" alt="mysql logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" height="60" width="72" alt="mongodb logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg" height="60" width="72" alt="sequelize logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" height="60" width="72" alt="npm logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" height="60" width="72" alt="redis logo"  />
  </div>
  
  
  ## Features

- User Authentication [oAuth]
- Slot Booking and Opening system 
- Secured password through hashing 
- Token Blacklisting [caching]
- Add Pets  
- Role Based Access Control 


## User Interface of App 

<img src="https://i.ibb.co/GtFLtVs/petmate-landingpage.png" alt="petmate-landingpage" border="0">
<img src="https://i.ibb.co/Z1BDLdj/Petmate-login-signup-UI.png" alt="Petmate-login-signup-UI" border="0">
<img src="https://i.ibb.co/K9YgF2f/petmate-homepage-user.png" alt="petmate-homepage-user" border="0">
<img src="https://i.ibb.co/hCbc8DQ/petmate-Bookings-Page.png" alt="petmate-Bookings-Page" border="0">
<img src="https://i.ibb.co/h9R8FF7/Petmate-doctor-homepage.png" alt="Petmate-doctor-homepage" border="0">
<img src="https://i.ibb.co/MCSbNpm/admin-Dashboard.png" alt="Petmate-admin-dashboard" border="0">

