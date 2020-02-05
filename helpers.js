
module.exports = {
    findToyInArrayWithID: function(toysArray, id) {
        toysArray.forEach(toy => {
            if (toy.id == id) {
                return toy;
            }
        });
    
        return null;
    },

    retrieveToys: function(query, callback) {
        Toy.find(query, function(err, toys) {
            if (err) {
              callback(err, null);
            } else {
              callback(null, toys);
            }
        });
    }
};
