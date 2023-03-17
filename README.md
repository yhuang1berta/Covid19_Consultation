# Project Name : Covid 19 Consultation

#### The website is : [Covid 19 Consultation](https://protected-journey-54920.herokuapp.com/)

Covid 19 Consultation app is a social health app that focuses on online chatting between doctors and patient, so patients can be diagnoised online without in-person consultation. The interface is somewhat similar to Facebook messenger, where each patient can see the residency of each doctor available and send message to them to seek professional help.
  
  Due to the current situation around the globe (COVID-19), we have also set up a few features that can help our users to quickly get a grasp of what's happening around them, these features including infected cases in their (registered) provinces, world-wide, and news about the disease.


## To Run the APP Locally

First clone the git repo

```
git clone https://github.com/csc309-summer-2020/team12.git
```

then
```
### only view the websites without starting server and database (recommend)
cd covid19_consultation/client
npm run build
npm start
```

```
### type the following code into terminal if wish to access the consultation with server
cd covid19_consultation
### Start the server locally
node server.js
### start the client side 
cd client
npm run build
```

open the [localhost:5000](http://localhost:5000), then you will see the Home page.

#### Number of registered patient

<img src="./client/public/27.png">

From this part of the home page, you can see the number of registered patient using our app. (this number is updated dynamically)

#### COVID-19 page and Prevention
<img src="./client/public/18.png">

<img src="./client/public/20.png">

This page talks about the number of infected 

## Login Users

<img src="./client/public/2.png" />

You can login to different accounts by entering the following username and password for the pre-set account

#### - for Patient:
    username: test

    password: test
    
<img src="./client/public/3.png" />

#### - for Doctor:
    username: test

    password: test
    
<img src="./client/public/1.png" />

#### - for Admin:
    username: test

    password: test
    
<img src="./client/public/5.png" />

## Register for User

<img src="./client/public/4.png" />

By click -> Sign up (in login dropdown), you can then sign up a new user account

## Patient Side

#### Infected Cases

<img src="./client/public/6.png">

Upon login, the user can see the number of infected cases in their registered province, and by selecting the other provinces in dropdown, he/she can also view infected cases in other provinces.

#### Ask a Doctor
Ask a doctor feature can be accessed through clicking the "ask a doctor" option on the header.

<img src="./client/public/9.png">

User can sort/search doctors by name/residency/location in the table column. After clicking the chat button, patient will be moved to chat room with the doctor.

#### Chatting with doctor
To chat with a doctor, the user would need to click on that doctor's chat button which will take the user to the following looking chat page.

<img src="./client/public/10.png">

User can send doctor message by typing in the chat box, and hitting "enter" on keyboard. 

#### Visit History

<img src="./client/public/7.png">

After chatting with a doctor, the visit history pannel will track the doctor(s) this user has chatted with, and it also provides a short-cut chat option to chat with them again!



## Doctor Side


#### Chat with Patients (Incoming message)

<img src="./client/public/14.png">
Page will load all messages received by doctor and show the latest message sent from patient.

The doctors are eligible to decide whether to answer the patients' messages or not. 

#### Search for Patient

<img src="./client/public/12.png">

Doctors can search patients by their username or id to learn more about them or add them to watchlist!

#### Watchlist

<img src="./client/public/13.png">

After searching and found a patient, the doctor can add/remove them to/from watchlist if they wish.
Doctor can also add patients to the watchlist through chatting page.
<img src="./client/public/17.png">

## Admin Side

#### Edit account info

<img src="./client/public/21.png">
<img src="./client/public/22.png">

After login to the admin dashboard, the admin will have the access to the information of all users by switching between "Patient Info" and "Doctor Info" tabs.

For each entry in the columns, the admin can edit them, and update the info to database after clicking the edit button.

**Note: after changing the username of accounts, the chat history would be lost!!!**

#### Edit News

<img src="./client/public/23.png">
<img src="./client/public/24.png">
<img src="./client/public/25.png">

News body, title, and links can be editted by admin through the Canada/US/World News tab.  Admin should click delete button first and than entering the news, link and title of the news.


#### Edit Cases

<img src="./client/public/26.png">

The infected Cases of each Province, world-wide, and recoevered cases can be editted by admin through the Cases tab. Admin should click delete button first and than entering the number of the cases.

## Notes for developers

#### Creating Doctor account (require server to run at local)

<img src="./client/public/28.png">

Since we expect all doctor account users are qualified professionals, normally you would need to submit a application form to the relevant agency in order to acquire a doctor account, which should have a process including verifying license. Therefore, we didn't make a doctor sign up page

However, since this project is a student project, you may use postman, with a post request at "http://localhost:5000/doctors" , the following is the template for a doctor account sign up call:

{
  "username": "test2"
  "password": "password"
  "doctorType": "Dentist"
  "location": "Ontario"
}

#### Creating Admin account (require server to run at local)

<img src="./client/public/29.png">

The situation here is similar to the one with doctor account sign up, only the development team should have access to admin account

However, since this project is a student project, you may use postman, with a post request at "http://localhost:5000/admins" , the following is the template for a doctor account sign up call:

{
  "username": "admin"
  "password": "admin"
}

#### 
