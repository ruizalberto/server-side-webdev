const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var usageSchemaful = new Schema({
    name: {
        type: String,
        required: true,
    },
    shopping_usage: {
        type: Number,
    },
    education_usage: {
        type: Number,
    },
    browsing_usage: {
        type: Number,
    },
    social_media_usage: {
        type: Number,
    },
    date: {
        type: Date, default: Date.now
    }
});
var usages = mongoose.model('Usage', usageSchemaful);

module.exports = usages;