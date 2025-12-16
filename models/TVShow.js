const mongoose = require("mongoose");

const tvShowSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: true,
    },
    premiere_year: {
        type: Number,
        required: true,
    },
    end_year: {
        type: Number,
    },
    seasons: {
        type: Number,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
    },
});

module.exports = mongoose.model("TVShow", tvShowSchema);
