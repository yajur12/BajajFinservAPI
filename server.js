const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('BFHL API is running. Use POST /bfhl');
});

app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    const response = {
        is_success: false,
        user_id: "john_doe_17091999",
        email: "shivanshu2330.be@chitkara.edu.in",
        roll_number: "2210992550",
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: "0",
        concat_string: ""
    };

    if (!Array.isArray(data)) {
        return res.status(400).json({
            ...response,
            error: "Input 'data' must be an array."
        });
    }

    let totalSum = 0;
    const allAlphabetsForConcat = [];

    for (const item of data) {
        if (typeof item !== 'string') {
            continue;
        }

        if (/^\d+$/.test(item)) {
            const num = parseInt(item, 10);
            totalSum += num;
            if (num % 2 === 0) {
                response.even_numbers.push(item);
            } else {
                response.odd_numbers.push(item);
            }
        } else if (/^[a-zA-Z]+$/.test(item)) {
            response.alphabets.push(item.toUpperCase());
            for (const char of item) {
                if (/[a-zA-Z]/.test(char)) {
                    allAlphabetsForConcat.push(char);
                }
            }
        } else {
            response.special_characters.push(item);
        }
    }

    response.sum = totalSum.toString();

    let joinedAlphabets = allAlphabetsForConcat.join('');
    let reversedAlphabets = joinedAlphabets.split('').reverse().join('');
    let finalConcatString = '';
    for (let i = 0; i < reversedAlphabets.length; i++) {
        if (i % 2 === 0) {
            finalConcatString += reversedAlphabets[i].toUpperCase();
        } else {
            finalConcatString += reversedAlphabets[i].toLowerCase();
        }
    }
    response.concat_string = finalConcatString;

    response.is_success = true;
    res.status(200).json(response);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
