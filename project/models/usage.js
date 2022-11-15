const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//require('mongoose-currency').loadType(mongoose);
//var Currency = mongoose.Types.Currency;

var usageSchemaful = new Schema({
    name: {
        type: String,
        required: true,
    },
    shopping_usage: {
        type: Number,
        min: 0,
    },
    education_usage: {
        type: Number,
        min: 0,
    },
    browsing_usage: {
        type: Number,
        min: 0,
    },
    social_media_usage: {
        type: Number,
        min: 0,
    },
}, {
    timestamps: true
});
var usages = mongoose.model('Usage', usageSchemaful);

module.exports = usages;