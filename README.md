# Jogger 
Jogger is an application that tracks jogging times of users
## Features
A user can create an account and log in.
A user can see, edit and delete his times he entered.
A user can filter by dates from-to.
Report on average speed & distance per week.

## Installation

```bash
npm install
```
## Running Dev Server

```bash
npm run start 
```
## Prompt
Implement at least three roles with different permission levels: a regular user would only be able to CRUD on their owned records, a user manager would be able to CRUD users, and an admin would be able to CRUD all records and users.
Each time entry when entered has a date, distance, and time.
When displayed, each time entry has average speed.


REST API. Make it possible to perform all user actions via the API, including authentication
In any case, you should be able to explain how a REST API works and demonstrate that by creating 
functional tests that use the REST Layer directly. Please be prepared to use REST clients like 
Postman, cURL, etc. for this purpose.

All actions need to be done client side using AJAX, refreshing the page is not acceptable.
Minimal UI/UX design is needed. You will not be marked on graphic design. However, do try to 
keep it as tidy as possible. 

Bonus: unit and e2e tests.
