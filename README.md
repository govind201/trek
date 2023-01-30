This is a Travel API CREATED IN NODE.JS, and also uses express, mongodb(db), jwt(auth);
## Trek API
Trek API is a RESTful API written in Node.js using the Express framework. It has several endpoints for different functionality, including:

/api/states - Endpoint for accessing information about states.
/api/places - Endpoint for accessing information about places.
/api/journeys - Endpoint for creating and accessing information about journeys of a user between two places.
/api/users - Endpoint for creating and accessing information about users.
/api/auth - Endpoint for handling authentication using JSON Web Tokens (JWT).
/api/confirm - Endpoint for handling confirmation of user accounts.
This API uses MongoDB as the database and has been tested to ensure proper functionality.

# Getting Started
To get started with using the Trek API, follow these steps:

# Introduction
This is a RESTful API for managing customer journeys and their details. The API is built using Node.js, Express, MongoDB, and several other packages.

Endpoints
The API consists of the following endpoints:

* POST /api/customers: Adds a new customer to the database.
* GET /api/customers: Retrieves a list of all customers.
* GET /api/customers/:id: Retrieves a customer by their ID.
* PUT /api/customers/:id: Updates a customer by their ID.
* DELETE /api/customers/:id: Deletes a customer by their ID.
* POST /api/places: Adds a new place to the database.
* GET /api/places: Retrieves a list of all places.
* GET /api/places/:id: Retrieves a place by its ID.
* PUT /api/places/:id: Updates a place by its ID.
* DELETE /api/places/:id: Deletes a place by its ID.
* POST /api/journeys: Adds a new journey to the database.
* GET /api/journeys: Retrieves a list of all journeys.
* GET /api/journeys/:id: Retrieves a journey by its ID.
* PUT /api/journeys/:id: Updates a journey by its ID.
* DELETE /api/journeys/:id: Deletes a journey by its ID.
# Customer Endpoints
The /api/customers endpoint allows you to perform CRUD (Create, Read, Update, and Delete) operations on the customer data.

Adding a Customer
To add a customer, you need to send a POST request to the /api/customers endpoint with the following JSON data:


`
{
  "name": "John Doe",
  "phone": "555-555-5555",
  "isGold": true
}

`
## Retrieving Customers
To retrieve a list of all customers, you need to send a GET request to the /api/customers endpoint.

## Retrieving a Customer by ID
To retrieve a customer by their ID, you need to send a GET request to the /api/customers/:id endpoint.

## Updating a Customer
To update a customer, you need to send a PUT request to the /api/customers/:id endpoint with the updated JSON data.

## Deleting a Customer
To delete a customer, you need to send a DELETE request to the /api/customers/:id endpoint.

## Place Endpoints
The /api/places endpoint allows you to perform CRUD (Create, Read, Update, and Delete) operations on the place data.

## Adding a Place
To add a place, you need to send a POST request to the /api/places endpoint with the following JSON data:

`
Copy code
{
  "name": "San Francisco",
  "description": "A beautiful city in California"
}
`
## Retrieving Places
To retrieve a list of all places, you need to send a GET request to the /api/places endpoint.

## Retrieving a Place by ID
To retrieve a Place by its ID, you can make a GET request to the following endpoint: /places/{place_id}. The place_id in the endpoint should be replaced by the ID of the Place you want to retrieve.

This endpoint will return the Place details in JSON format, including the Place ID, Name, Description, Address, and Coordinates.

Examples:

To retrieve Place with ID "1", make the following GET request
GET /places/1

To retrieve Place with ID "2", make the following GET request:
GET /places/2
to place by its ID, make a GET request to the endpoint /places/<place_id>.

{
  "id": "abc123",
  "name": "Central Park",
  "address": "New York, NY, USA",
  "latitude": 40.785091,
  "longitude": -73.968285
}
# Adding a Place
To add a new place, make a POST request to the endpoint /places with a JSON body containing the following fields:

name (required, string) - the name of the place
address (required, string) - the address of the place
latitude (required, float) - the latitude coordinate of the place
longitude (required, float) - the longitude coordinate of the place
Example request body:
{
  "name": "Empire State Building",
  "address": "350 5th Ave, New York, NY 10118, USA",
  "latitude": 40.748440,
  "longitude": -73.985664
}

# Response
{
  "id": "def456",
  "name": "Empire State Building",
  "address": "350 5th Ave, New York, NY 10118, USA",
  "latitude": 40.748440,
  "longitude": -73.985664
}


Updating a Place
To update a place, make a PUT request to the endpoint /places/<place_id> with a JSON body containing the fields you wish to update.

Example request body:
{
  "name": "Updated Empire State Building Name"
}
Response: 
{
  "id": "def456",
  "name": "Updated Empire State Building Name",
  "address": "350 5th Ave, New York, NY 10118, USA",
  "latitude": 40.748440,
  "longitude": -73.985664
}
# Deleting a Place
To delete a place, make a DELETE request to the endpoint /places/<place_id>.

# Additional Features

Ability to add, update, and delete a Place.
Advanced search functionality to search for Places by name, location, and other attributes.
Ability to return Places within a specified distance from a given location.
# Endpoints:

POST /places to add a new Place
PUT /places/:id to update a Place with a specific ID
DELETE /places/:id to delete a Place with a specific ID
GET /places/search to search for Places


Clone the repository to your local machine.
Install the necessary dependencies by running npm install in the terminal.
Start the API by running npm start in the terminal.
Endpoints
Detailed documentation on the usage of each endpoint can be found in the API documentation.

# Testing
The Trek API has been tested to ensure proper functionality. To run the tests, simply run npm test in the terminal.

# Contributing
If you would like to contribute to the Trek API, please fork the repository and create a pull request with your changes.

