const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;


var pizzaSchemaful = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    customer: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
var pizzas = mongoose.model('Pizza', pizzaSchemaful); //initialize a model with a scheme you created. schema gives the layout while the model provides the functions for interacting the database

module.exports = pizzas;