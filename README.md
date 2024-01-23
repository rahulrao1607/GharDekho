# Residency Booking System API

This project implements an API for a residency booking system using Node.js and Prisma. The system allows users to create residencies, manage bookings, and maintain a list of favorite residencies.

## Table of Contents

- [Residency Management](#residency-management)
  - [Create Residency](#create-residency)
  - [Get All Residencies](#get-all-residencies)
  - [Get Residency by ID](#get-residency-by-id)
- [User Management](#user-management)
  - [Create User](#create-user)
  - [Book Visit](#book-visit)
  - [Get All Bookings](#get-all-bookings)
  - [Cancel Booking](#cancel-booking)
  - [Add to Favorites](#add-to-favorites)
  - [List All Favorites](#list-all-favorites)

## Residency Management

### Create Residency

- **Endpoint:** `POST /createResidency`
- **Description:** Allows the creation of a new residency.

### Get All Residencies

- **Endpoint:** `GET /getAllResidencies`
- **Description:** Retrieves a list of all residencies.

### Get Residency by ID

- **Endpoint:** `GET /getResidency/:id`
- **Description:** Retrieves a specific residency by its ID.

## User Management

### Create User

- **Endpoint:** `POST /createUser`
- **Description:** Creates a new user.

### Book Visit

- **Endpoint:** `POST /bookVisit/:id`
- **Description:** Books a visit for a specific residency.

### Get All Bookings

- **Endpoint:** `GET /getAllBookings`
- **Description:** Retrieves all bookings for a user.

### Cancel Booking

- **Endpoint:** `DELETE /cancelBooking/:id`
- **Description:** Cancels a booking for a specific residency.

### Add to Favorites

- **Endpoint:** `POST /toFav/:rid`
- **Description:** Adds or removes a residency to/from user favorites.

### List All Favorites

- **Endpoint:** `GET /allFav`
- **Description:** Retrieves a list of all favorite residencies for a user.
