# Idea of the App
It's a productivity/organization app. Users create "domains" and "activities".
- Domain: a collection of activities. Example: outdoor, indoor, physical health, professional development...etc
- Activity: the action to be made. Example: going for a walk, learning react native, go to a soccer game...etc

Under each domain is a set of activities.
For each activity, the user can specify how long it roughly takes

Eventually the goal is to have a database of domains/activities such that when a user is looking for something to do, they can look through their domains + activities for ideas.

## Current Features
- multiple screens, including splash screen
- each domain is clickable to reveal the activity page
- user can add domains/activities with an input name
- user also specify how long an activity takes when creating it

- able to delete domains/activities by clicking the X button
- deleting a domain also deletes all activies that belong to it

- data persists on the device using sqlite
- restarting app doesnt reset activities/domains
- app doesnt need internet to function


## Long term goal:
- grab user input on what activies they did in a period of time. Example: monday they went swimming, tuesday they watched a movie...etc
- provide further analytics, like a weekly report, on what domains were most active and what activities were done
- add cool new designs :D

Note: this app was developed mainly to delve into the react native world and learn a few things :)



To run the app:
- npm start
- npm run android
or
- npm start .... in the same terminal press `a` to run on android