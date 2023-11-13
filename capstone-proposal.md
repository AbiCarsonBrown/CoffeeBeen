# Project Title

## Overview

What is your app? Brief description in a couple of sentences.

Discover the world of coffee in London!
The place to go for finding speciality coffee in London. Visualise the best coffee shops on a map, or in list view, keep track of where you've visited and where you'd like to go next. Unlock achievements, rate the places you've been and even add your own.

### Problem

Why is your app needed? Background information around any pain points or other reasons.

For people who love speciality and independent coffee, it can be hard to discover new places, keep track of the places you love and have fun while doing it!

### User Profile

Who will use your app? How will they use it? Any special considerations that your app must take into account.

The app is for coffee lovers or those who want to discover more. They may want to find good coffee in a certain part of the city or simply keep a note of the best places they've been.

### Features

List the functionality that your app will include. These can be written as user stories or descriptions with related details. Do not describe _how_ these features are implemented, only _what_ needs to be implemented.

- FIND coffee shops - use the app's map or list function to see great coffee shops and where they are
- TRACK the spots you've visited - like a scratch map or sticker collection
- RATE them - give a review and a rating on our 1-5 coffee bean scale
- ADD your own - Got places you love or want to try? Add them to your profle.

## Implementation

### Tech Stack

List technologies that will be used in your app, including any libraries to save time or provide more functionality. Be sure to research any potential limitations.

Front End:
React
HTML
CSS/Sass
JavaScript
Axios

Back End:
Node.js
Express.js
MySQL
Knex.js

Other:
Babel
Postman
Git & GitHub
NPM

### APIs

List any external sources of data that will be used in your app.

Google Maps API
Database of coffee shops

### Sitemap

List the pages of your app with brief descriptions. You can show this visually, or write it out.

Homepage - displays all coffee shops in map view or list view. Indicates which have been visited by the user.
Individual page for each coffee shop with details, ratings, reviews and user visits. Will also display user specific data such as "You vistied this coffee shop on 12th November 2023".
User Profile page - a user can view their stats, see the list of coffee shops they've visited, reviewed and rated and their wishlist of coffee shops to visit.

### Mockups

Provide visuals of your app's screens. You can use tools like Figma or pictures of hand-drawn sketches.

### Data

Describe your data and the relationships between them. You can show this visually using diagrams, or write it out.

![Diagram of basic database tables and relationships between them.](./assets/diagrams/database-diagram.png)

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

GET for all coffee shops
Example response :
{coffeeshop_id,
name,
address,
average rating
}

GET coffee shop details (parameters: coffee shop ID)
Example response :
{coffeeshop_id,
name,
address,
description,
average rating,
review count,
visit count
}

GET all reviews for a coffee shop (parameters: coffee shop ID)
Example response :
{review_id,
coffeeshop_id,
coffeeshop_name,
user_id,
username,
review,
timestamp
}

POST review for a coffee shop (parameters: coffee shop ID, user ID)
Example response :
{review_id,
coffeeshop_id,
user_id,
review
}

POST rating for a coffee shop (parameters: coffee shop ID, user ID)
Example response :
{rating_id,
coffeeshop_id,
user_id,
rating
}

POST visit for a coffee shop (parameters: coffee shop ID, user ID)
Example response :
{visit_id,
coffeeshop_id,
user_id
}

PATCH to update whether a coffee shop is on a user's wishlist (parameters: coffee shop ID, user ID)
Example response :
{wishlist_id,
coffeeshop_id,
user_id,
on_wishlist
}

PATCH to edit user's own rating or review (parameters: coffee shop ID, user ID)
Example response :
{rating_id,
coffeeshop_id,
user_id,
rating
}
or
{review_id,
coffeeshop_id,
user_id,
review
}

DELETE user's own rating or review (parameters: coffee shop ID, user ID)
No response

POST coffee shop to user submitted table (parameters: user ID)
Example response :
{coffeeshop_id,
user_id,
name,
address}

PUT to edit coffee shop in user submitted table (parameters: coffee shop ID (user submitted), user ID)
Example response :
{coffeeshop_id,
user_id,
name,
address}

DELETE coffee shop from user submitted table (parameters: coffee shop ID (user submitted), user ID)
No response

### Auth

Does your project include any login or user profile functionality? If so, describe how authentication/authorization will be implemented.

Some data and parts of the UI will be user specific, so some form of login/profile functionality will be necessary.

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation. Think about what you can reasonably complete before the due date. The more detail you provide, the easier it will be to build.

- Get database set up with sample coffee shop data
- Create end points for the HTTP methods
- Link up front end & back end

## Nice-to-haves

Your project will be marked based on what you committed to in the above document. Under nice-to-haves, you can list any additional features you may complete if you have extra time, or after finishing.

- UNLOCK achievemnts as you go - the more places you visit the more you gain!
- Location services - check in at coffee shops for extra achievements/rewards, find places close to where you are, AR featues unlocked on check in.
- Add friends - see where your friends have visited, comment/message/interact with them, some sort of leaderboard, see other's reviews. Like Strava for coffee drinkers!
- Earn points & discounts to use in store, QR code to scan and earn achievements when you buy something in store
- Check user submitted entries and add to core database
- Scratch map/sticker book design for achievements
