const mongoose = require('mongoose');

const questSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        monster: {
            type: String,
            required: true,
        },
        percentage: {
            type: Number,
            required: true,
        },
        reward: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Quest', questSchema);
