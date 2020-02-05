/**
 * This module contains helper function definitions that are used in index.js
 */

module.exports = {
    /**
     * Returns a toy by given id
     * 
     * @param {Array} toysArray 
     * @param {Number} id
     * @returns {Toy} 
     */
    findToyInArrayWithID: function(toysArray, id) {
        for (const toy of toysArray) {
            if (toy.id == id) {
                return toy;
            }
        }
    
        return null;
    },

    /**
     * It's a wrapper function to mitigate the async behavior of mongoose
     * 
     * @param {Object} query 
     * @param {Function} callback 
     */
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
