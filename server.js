const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Basic route for root URL - good for health checks
app.get('/', (req, res) => {
    res.send('BFHL API is running. Use POST /bfhl');
});

// POST /bfhl route - Main API logic
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    // Initialize response object with default values
    const response = {
        is_success: false, // Will be set to true on successful processing
        user_id: "john_doe_17091999", // As per example in the problem statement
        email: "shivanshu2330.be@chitkara.edu.in", // As provided by you
        roll_number: "2330BE00000", // Placeholder - You might want to adjust this
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: "0",
        concat_string: ""
    };

    // Input validation: Ensure 'data' is an array
    if (!Array.isArray(data)) {
        return res.status(400).json({
            ...response,
            error: "Input 'data' must be an array."
        });
    }

    let totalSum = 0;
    // This array will store individual alphabetic characters for the 'concat_string' logic
    const allAlphabetsForConcat = [];

    // Iterate through each item in the input data array
    for (const item of data) {
        if (typeof item !== 'string') {
            // As per examples, assume all input array elements are strings.
            // If non-string elements are present, they are skipped for simplicity.
            continue;
        }

        // Regex to check if the string contains only digits (a number)
        if (/^\d+$/.test(item)) {
            const num = parseInt(item, 10);
            totalSum += num;
            if (num % 2 === 0) {
                response.even_numbers.push(item); // Store as string
            } else {
                response.odd_numbers.push(item); // Store as string
            }
        }
        // Regex to check if the string contains only alphabetic characters
        else if (/^[a-zA-Z]+$/.test(item)) {
            response.alphabets.push(item.toUpperCase()); // Store the whole word in uppercase
            
            // Extract individual characters for 'concat_string'
            for (const char of item) {
                if (/[a-zA-Z]/.test(char)) { // Double-check if char is alphabet (redundant here, but robust)
                    allAlphabetsForConcat.push(char);
                }
            }
        }
        // If it's neither a pure number nor a pure alphabet string, categorize as special character
        else {
            response.special_characters.push(item);
        }
    }

    // Convert total sum to string
    response.sum = totalSum.toString();

    // Generate 'concat_string' based on collected individual alphabetic characters
    // 1. Join all characters to form a single string
    let joinedAlphabets = allAlphabetsForConcat.join('');
    // 2. Reverse the string
    let reversedAlphabets = joinedAlphabets.split('').reverse().join('');
    // 3. Apply alternating caps (first char uppercase, second lowercase, etc.)
    let finalConcatString = '';
    for (let i = 0; i < reversedAlphabets.length; i++) {
        if (i % 2 === 0) {
            finalConcatString += reversedAlphabets[i].toUpperCase();
        } else {
            finalConcatString += reversedAlphabets[i].toLowerCase();
        }
    }
    response.concat_string = finalConcatString;

    // Mark as success and send the response
    response.is_success = true;
    res.status(200).json(response);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Export the app for Vercel deployment (Vercel will look for this)
module.exports = app;