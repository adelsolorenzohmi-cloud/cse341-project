const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
    zoneName: {
        type: String,
        required: true
    },
    municipality: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    totalPopulation: {
        type: String
    }
});

module.exports = mongoose.model('Zone', zoneSchema);