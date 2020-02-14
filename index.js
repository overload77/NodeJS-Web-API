var express = require('express');
var app = express();

var Animal = require('./Animal.js');
var Toy = require('./Toy.js');
var helpers = require('./helpers.js');


/**
 * This API finds and returns the Toy in the “toys” collection
 * with the ID that matches the id parameter.
 * It returns the entire Toy document/object,
 * including all properties that are stored in the database.
 */
app.use('/findToy', (req, res) => {

    var searchId = req.query.id;

    Toy.findOne({ id: searchId }, (err, toy) => {
        if (err) {       
            res.type('html').status(500);
            res.send("Error " + err);
        } else if (!toy) {
            res.json({});
        } else {
            res.json(toy);
        }
    });
});


/**
 * This API finds all Animals in the “animals” collection that have a species and gender that match
 * the species and gender parameters, respectively,
 * and for which one of the Animal’s traits matches the trait parameter.
 */
app.use('/findAnimals', (req, res) => {
    
    if (!req.query.species && !req.query.trait && !req.query.gender) {
        res.json({});
    }
        
    var searchSpecies = req.query.species;
    var searchTrait   = req.query.trait;
    var searchGender  = req.query.gender;

    var query = {};
    var selectedFields = {
        _id: 0,
        name: 1,
        species: 1,
        breed: 1,
        gender: 1,
        age: 1
    };

    if (searchSpecies) {
        query.species = searchSpecies;
    }
    if (searchTrait) {
        query.traits = searchTrait;
    }
    if (searchGender) {
        query.gender = searchGender;
    }

    Animal.find(query, selectedFields, (err, animals) => {
        if (err) {
            res.type('html').status(500);
            res.send("Error " + err);
        } else if (!animals || animals.length == 0) {
            res.json({});
        } else {
            res.json(animals);
        }
    });
});


/**
 * This API finds all Animals in the “animals” collection
 * that have an age that is less than (but not equal to) the age parameter.
 */
app.use('/animalsYoungerThan', (req, res) => {
    
    if (!req.query.age || isNaN(req.query.age)) {
        res.json({});
    }

    var maximumAge = req.query.age;
    var query = { age: { $lt: maximumAge} };
    var selectedFields = {
        _id: 0,
        name: 1
    };
    var animalNames = [];

    Animal.find(query, selectedFields, (err, animals) => {
        if (err) {
            res.status(500);
            res.send("Error " + err);
        } else if (!animals || animals.length == 0) {
            res.json({ count: 0 });
        } else {
            let animalCount = animals.length;

            // Iterate animals array and push each animals name to a new array
            animals.forEach(animal => {
                animalNames.push(animal.name);
            });

            res.json({
                count: animalCount,
                names: animalNames
            });
        }
    });
});


/**
 * This API calculates the total price of purchasing the specified quantities of the Toys
 * with the corresponding IDs, using the Toys’ price from the database.
 */
app.use('/calculatePrice', (req, res) => {

    if (!req.query.id || !req.query.qty || (req.query.id.length != req.query.qty.length)) {
        res.json({});
        return;
    }

    var ids = req.query.id;
    var quantities = req.query.qty;

    // Using $in selector to find toys with given ids array
    var query = { id: { $in: ids } };
    var foundToys = [];
    var items = [];
    var totalPrice = 0.0;
    
    helpers.retrieveToys(query, (err, toys) => {
        if (err) {
            res.status(500);
            res.send("Error " + err);
        } else if (!toys || toys.length == 0) {
            res.json({});
            return;
        } else {
            for (let i = 0; i < ids.length; i++) {
                const id = ids[i];
                const qty = quantities[i];
        
                if (isNaN(qty) || qty < 1) {
                    continue;
                }
        
                const toy = helpers.findToyInArrayWithID(foundToys, id);
        
                if (!toy) {
                    continue;
                }
        
                let subTotal = toy.price * qty;
                let item = {
                    item: toy.id,
                    qty: qty,
                    subtotal: subTotal
                };
                items.push(item);
                totalPrice += subTotal;
            }
        
            res.json({
                totalPrice: totalPrice,
                items: items
            });
        }
    });

});


// Test case for default uri
app.use('/', (req, res) => {
    res.json({ msg: 'It works!' });
});


// Server runs on port 3000
app.listen(3000, () => {
    console.log('Listening on port 3000');
});


module.exports = app;