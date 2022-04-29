const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming json data
app.use(express.json());

const { animals } = require('./data/animals');

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // Save personalityTraits as a dedicated array.
        // If personalityTraits is a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray - query.personalityTraits;
        }
        // loop thorugh each trait in the peronslaityTraits array:
        personalityTraitsArray.forEach(trait => {
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            )
        })
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet)   
     }
     if (query.species) {
         filteredResults = filteredResults.filter(animal => animal.species === query.species);
     }
     if (query.name) {
         filteredResults = filteredResults.filter(animal => animal.name === query.name);
     }
     return filteredResults;
}

function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

function createNewAnimal(body, animalsArray) {
    console.log(body);
    //our function's main code

    //return finished code to post route for response
    return body;
}

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
  });

app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
})

app.post('/api/animals', (req, res) => {
    // req.body is where our incoming content will be
    //set id based on what the next index of the array will be
    req.body.id = animals.length.toString();
    
    res.json(req.body);
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });