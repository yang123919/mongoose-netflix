const express = require("express");
const mongoose = require("mongoose");
const TVShow = require("./models/TVShow");

const app = express();
app.use(express.json());

mongoose
    .connect("mongodb://localhost:27017/tvshows")
    .then(() => {
        console.log("MongoDB connected");
        app.listen(3000, () => {
            console.log("Server running on port 3000");
        });
    })
    .catch((err) => console.log(err));

const createMultipleShows = async () => {
    const shows = [
        {
            title: "Breaking Bad",
            creator: "Vince Gilligan",
            premiere_year: 2008,
            end_year: 2013,
            seasons: 5,
            genre: "Crime",
            rating: 9.5,
        },
        {
            title: "Stranger Things",
            creator: "The Duffer Brothers",
            premiere_year: 2016,
            seasons: 4,
            genre: "Sci-Fi",
            rating: 8.7,
        },
        {
            title: "The Office",
            creator: "Greg Daniels",
            premiere_year: 2005,
            end_year: 2013,
            seasons: 9,
            genre: "Comedy",
            rating: 8.9,
        },
        {
            title: "Game of Thrones",
            creator: "David Benioff & D.B. Weiss",
            premiere_year: 2011,
            end_year: 2019,
            seasons: 8,
            genre: "Fantasy",
            rating: 8.3,
        },
        {
            title: "The Mandalorian",
            creator: "Jon Favreau",
            premiere_year: 2019,
            seasons: 2,
            genre: "Sci-Fi",
            rating: 8.8,
        },
        {
            title: "Westworld",
            creator: "Jonathan Nolan & Lisa Joy",
            premiere_year: 2016,
            seasons: 4,
            genre: "Sci-Fi",
            rating: 8.6,
        },
        {
            title: "Fargo",
            creator: "Noah Hawley",
            premiere_year: 2014,
            seasons: 4,
            genre: "Crime",
            rating: 8.9,
        },
        {
            title: "Better Call Saul",
            creator: "Vince Gilligan & Peter Gould",
            premiere_year: 2015,
            end_year: 2022,
            seasons: 6,
            genre: "Crime",
            rating: 8.8,
        },
        {
            title: "Black Mirror",
            creator: "Charlie Brooker",
            premiere_year: 2011,
            seasons: 5,
            genre: "Sci-Fi",
            rating: 8.8,
        },
        {
            title: "The Crown",
            creator: "Peter Morgan",
            premiere_year: 2016,
            seasons: 6,
            genre: "Drama",
            rating: 8.7,
        },
    ];

    for (const showData of shows) {
        const show = new TVShow(showData);
        await show.save();
    }

    console.log("All TV Shows Saved!");
};



//Read shows by id
app.get("/shows/:id", async (req, res) => {
    const show = await TVShow.findById(req.params.id);
    res.json(show);
});

//Read shows
app.get("/shows", async (req, res) => {
        const { genre, rating, premiere_year } = req.query;

        const filter = {};

        if (genre) {
            filter.genre = genre;
        }

        if (rating) {
            filter.rating = { $gt: Number(rating) };
        }

        if (premiere_year) {
            filter.premiere_year = { $gt: Number(premiere_year) };
        }

        const shows = await TVShow.find(filter);
        res.json(shows);

});

//Add new show
app.post("/shows", async (req, res) => {
    const show = new TVShow(req.body);
    const savedShow = await show.save();
    res.status(201).json(savedShow);
});

//Update show
app.put("/shows/:id", async (req, res) => {
    const updatedShow = await TVShow.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedShow);
});

//Delete show
app.delete("/shows/:id", async (req, res) => {
    await TVShow.findByIdAndDelete(req.params.id);
    // res.send("Test")
    res.sendStatus(204);
});
// createMultipleShows();
