const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },        // Field 1
    projectType: {
        type: String,
        required: true
    },        // Field 2
    budgetQuetzales: {
        type: Number,
        required: true
    },      // Field 3
    status: {
        type: String,
        enum: ['Planning', 'In Progress', 'Completed'],
        default: 'Planning'
    },       // Field 4
    startDate: {
        type: Date
    },                 // Field 5
    estimatedEndDate: {
        type: Date
    },          // Field 6
    beneficiaryFamiliesCount: {
        type: Number,
        required: true
    }, // Field 7
    zoneId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Zone',
        required: true
    }          // Field 8 (Links to Zone collection)
});

module.exports = mongoose.model('Project', projectSchema);