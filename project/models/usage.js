const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var usageSchemaful = new Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date, default: Date.now
    }
});
var usages = mongoose.model('Usage', usageSchemaful);

module.exports = usages;