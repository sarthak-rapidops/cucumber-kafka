Feature: Testing User API

   Check whether user API is working correctly or not.

   Scenario: Empty Users data.
    When I send delete request to http://localhost:3000/user/deleteAll
    Then result should be "Users deleted".

   Scenario: Create Users
     Given the user json data
         | username | password |
         | sarthak  | 12345    |
         | abcd     | abc123   |
     When I send POST request to http://localhost:3000/user/signup
     Then 2 user will be created.


   Scenario: Check user login
     Given the user json data
        | username  | password |
        | sarthak   | 12345    |
     When I send POST request to http://localhost:3000/user/signin
     Then result should be "successful".

    Scenario: Check if proper validation is there while creating user again.
      Given the user json data
         | username | password |
         | sarthak  | 12345    |
     When I send POST request to http://localhost:3000/user/signup
     Then result should be "User already exist".