# Ticket Management System

## Overview
The Ticket Management System is a web application built using .NET 8 for the backend and Angular for the frontend. It provides a user-friendly interface for managing tickets, enabling users to create, read, update, and delete tickets efficiently.

## Features
**• User Authentication:** Secure login functionality using JWT (JSON Web Tokens) for user authentication.

**• Read Tickets:** View a list of all existing tickets with options for pagination, searching, and sorting.

**• Create Tickets:** Easily create new tickets with essential details such as description and status.

**• Update Tickets:** Edit ticket details as needed to reflect any changes or updates.

**• Delete Tickets:** Remove tickets from the system with confirmation prompts to prevent accidental deletions.

**• Secure API Requests:** All requests to the API are secured and require the JWT token generated upon login for authorization.

**• Responsive Design:** Built with DevExtreme components for a responsive and modern user interface.

## Technologies Used
### Backend:

  **• .NET 8:** ASP.NET Core for creating RESTful APIs.
  
  **• Entity Framework Core:** For data access and database management.
  
  **• SQL Server:** As the database to store ticket data.
  
  **• JWT (JSON Web Tokens):** For secure user authentication and authorization.
  
  **• XUnit & FakeItEasy:** For unit testing the backend functionality.

### Frontend:

  **• Angular:** A TypeScript-based framework for building dynamic web applications.
  
  **• DevExtreme:** A library for building responsive and feature-rich UI components.
  
  **• TypeScript:** For strong typing and improved development experience.
  
## Usage
**• Login:** Access the login page to authenticate your user account. Upon successful login, a JWT will be issued.

**• Viewing Tickets:** All tickets will be displayed in a DevExtreme data grid on the tickets page. Use the search bar to filter tickets or the sorting options to organize them by different criteria.

**• Creating a Ticket:** After logging in, click on the "Create Ticket" button and fill out the required fields. Submit the form to create a new ticket.

**• Updating a Ticket:** Click on a ticket in the grid to view its details, then click the "Edit" button to modify its information.

**• Deleting a Ticket:** Select a ticket in the grid and click the "Delete" button. Confirm the action to remove the ticket from the system.

## Deployment
The Ticket Management System has been deployed on a Windows server to ensure easy access for users.

## API Endpoints
### Tickets Endpoints
**• GET** /tickets - Retrieve a list of all tickets.

**• GET** /tickets/{id} - Retrieve a specific ticket by ID.

**• POST** /tickets - Create a new ticket.

**• PUT** /tickets/{id} - Update an existing ticket by ID.

• /tickets/{id} - Delete a specific ticket by ID.

### Authentication Endpoints

**• POST** /authentication/login - Authenticate a user and return a JWT token.

> Note: All API requests must include the JWT token in the Authorization header as a Bearer token.

## Testing

Unit tests are implemented using XUnit to ensure the backend functionality is working as expected. Run the tests using your preferred test runner or the command line:

> dotnet test
