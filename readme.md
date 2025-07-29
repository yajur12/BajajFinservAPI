# BFHL API (Chitkara Full Stack Question Paper)

This project implements a REST API as per the requirements of the Chitkara Full Stack Question Paper.

## Features

-   **POST /bfhl** endpoint
-   Processes an array of strings (`data`) from the request body.
-   Categorizes elements into even numbers, odd numbers, alphabets, and special characters.
-   Calculates the sum of numbers.
-   Generates a concatenated string of all alphabetic characters in reverse order with alternating caps.
-   Returns structured JSON response including `is_success`, `user_id`, `email`, `roll_number`.

## Tech Stack

-   **Node.js**
-   **Express.js** (for creating the REST API)
-   **body-parser** (for parsing JSON request bodies)

## Setup and Local Run

1.  **Clone the repository:**
    ```bash
    git clone <your-github-repo-url>
    cd bfhl-api
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the server:**
    ```bash
    npm start
    ```
    The API will start on `http://localhost:3000`.

## API Endpoint

-   **Method:** `POST`
-   **URL:** `/bfhl` (e.g., `http://localhost:3000/bfhl` for local testing)
-   **Content-Type:** `application/json`

### Request Body Example:

```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}