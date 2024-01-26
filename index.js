const express = require("express");
const https = require("https");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect("mongodb+srv://"+process.env.USER+":"+process.env.PASSWORD+"@cluster0.vgrepzn.mongodb.net/movieList", { useNewUrlParser: true });

const movieSchema = new mongoose.Schema({
    id: String,
    gen: String,
    imdbId: String,
    title: String,
    Year: String,
    Rated: String,
    Released: String,
    Runtime: String,
    Genre: String,
    Director: String,
    Plot: String,
    Language: String,
    Poster: String,
    Metascore: String,
    imdbRating: String,
    imdbVotes: String,
})
const Movie = mongoose.model("Movie", movieSchema);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", (req, res) => {
    console.log(process.env);
    let arr = [];
    let arrC = [];
    let arrA = [];
    let arrH = [];
    let arrR = [];
    Movie.find().then(function (search) {
        for (var k = 0; k < search.length; k++) {
            if (search[k].Poster && search[k].Poster != "N/A" && search[k].imdbId) {
                if (search[k].gen == "Comedy") {
                    arrC.push(search[k]);
                }
                else if (search[k].gen == "Adventure") {
                    arrA.push(search[k]);
                }
                else if (search[k].gen == "Romance")
                    arrR.push(search[k]);
                else if (search[k].gen == "Horror")
                    arrH.push(search[k]);
                else
                    arr.push(search[k]);
            }
        }
        res.render("home", { info: arr, Com: arrC, Hor: arrH, Adv: arrA, Rom: arrR });
    })
})

app.get("/database", (req, res) => {
    const apiKey = process.env.API_KEY1;
    var urlComedy = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=hi&page=1&sort_by=popularity.desc&with_genres=35&with_origin_country=IN&api_key=" + apiKey;
    var url = "https://api.themoviedb.org/3/movie/now_playing?language=hi&page=1&region=IN&api_key=" + apiKey;
    var urlAdventure = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=hi&page=1&sort_by=popularity.desc&with_genres=12&with_origin_country=IN&api_key=" + apiKey;
    var urlRomance = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=hi&page=1&sort_by=popularity.desc&with_genres=10749&with_origin_country=IN&api_key=" + apiKey;
    var urlHorror = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=hi&page=1&sort_by=popularity.desc&with_genres=27&with_origin_country=IN&api_key=" + apiKey;

    Movie.find().then(function (finds) {
        if (finds.length == 0) {
            console.log("No");
            async function comMovies() {
                const response = await fetch(urlComedy);
                const commovies = await response.json();
                return commovies
            }
            comMovies().then(commovies => {
                var movieSuggestion = commovies.results;
                for (var i = 0; i < movieSuggestion.length; i++) {
                    const gen = "Comedy";
                    const list = new Movie({
                        id: movieSuggestion[i].id,
                        gen: gen
                    });
                    list.save();
                }
            });
            async function genMovies() {
                const response = await fetch(url);
                const genmovies = await response.json();
                return genmovies
            }
            genMovies().then(genmovies => {
                var movieSuggestion = genmovies.results;
                for (var i = 0; i < movieSuggestion.length; i++) {
                    const list = new Movie({
                        id: movieSuggestion[i].id,
                    });
                    list.save();
                }
            });
            async function advMovies() {
                const response = await fetch(urlAdventure);
                const advmovies = await response.json();
                return advmovies
            }
            advMovies().then(advmovies => {
                var movieSuggestion = advmovies.results;
                for (var i = 0; i < movieSuggestion.length; i++) {
                    const gen = "Adventure";
                    const list = new Movie({
                        id: movieSuggestion[i].id,
                        gen: gen
                    });
                    list.save();
                }
            });
            async function romMovies() {
                const response = await fetch(urlRomance);
                const rommovies = await response.json();
                return rommovies
            }
            romMovies().then(rommovies => {
                var movieSuggestion = rommovies.results;
                for (var i = 0; i < movieSuggestion.length; i++) {
                    const gen = "Romance";
                    const list = new Movie({
                        id: movieSuggestion[i].id,
                        gen: gen
                    });
                    list.save();
                }
            });
            async function horMovies() {
                const response = await fetch(urlHorror);
                const hormovies = await response.json();
                return hormovies
            }
            horMovies().then(hormovies => {
                var movieSuggestion = hormovies.results;
                for (var i = 0; i < movieSuggestion.length; i++) {
                    const gen = "Horror";
                    const list = new Movie({
                        id: movieSuggestion[i].id,
                        gen: gen
                    });
                    list.save();
                }
            });
            setTimeout(function(){
                res.redirect("/database")
            }, 3000);
        }
        if (finds.length != 0) {
            console.log("Yes");
            for (let i = 0; i < finds.length; i++) {
                if (!finds[0].imdbId) {
                    var movieId = finds[i].id;
                    {
                        async function logMovies() {
                            const response = await fetch("https://api.themoviedb.org/3/movie/" + movieId + "/external_ids?api_key=" + apiKey);
                            const movies = await response.json();
                            return movies
                        }
                        logMovies().then(movies => {
                            Movie.find().then(function (search) {
                                var movieId = search[i].id;
                                var imdb = movies.imdb_id;
                                Movie.findOneAndUpdate({ id: movieId }, { imdbId: imdb }).then(function () {
                                    console.log("Its done Sucessfully");
                                })
                            }) // fetched movies
                        });
                    }
                }
                else {
                    var nameId = finds[i].imdbId;
                    if (!finds[i].title) {
                        const apiKey2 = process.env.API_KEY2;
                        try {
                            async function logMovies() {
                                if (nameId) {
                                    const response = await fetch("https://www.omdbapi.com/?i=" + nameId + "&apikey=" + apiKey2);
                                    const movies = await response.json();
                                    Movie.find().then(function (search) {
                                        console.log(movies.title)
                                        var imdb = search[i].imdbId;
                                        var name = movies.Title;
                                        var releaseDate = movies.Year;
                                        var rated = movies.Rated;
                                        var released = movies.Released;
                                        var runtime = movies.Runtime;
                                        var genre = movies.Genre;
                                        var director = movies.Director;
                                        var plot = movies.Plot;
                                        var language = movies.Language;
                                        var poster = movies.Poster;
                                        var metaScore = movies.Metascore;
                                        var imdbRate = movies.imdbRating;
                                        var imdbVote = movies.imdbVotes;
                                        Movie.findOneAndUpdate({ imdbId: imdb }, { title: name, Year: releaseDate, Rated: rated, Released: released, Runtime: runtime, Genre: genre, Director: director, Plot: plot, Language: language, Poster: poster, Metascore: metaScore, imdbRating: imdbRate, imdbVotes: imdbVote }).then(function () {
                                            console.log("Its done Sucessfully");
                                        })
                                    }
                                    );
                                }
                            }
                            logMovies();
                        }
                        catch (error) {
                            console.log(error);
                        }
                    }
                }
            }
            if(!finds[0].title){
                setTimeout(function(){
                    res.redirect("/database")
                }, 3000);
            }
            else{
                res.render("finish");
            }
        }
    })
})

app.get("/movie/:movieId", (req, res) => {
    Movie.find().then((searchs) => {
        var searchId = req.params.movieId;
        searchs.forEach((search) => {
            if (searchId == search.imdbId) {
                res.render("individual", { data: search });
            }
        })
    })
})

app.post("/", (req, res) => {
    var name = req.body.movie;
    const api = process.env.API_KEY2;
    async function logMovies() {
        const response = await fetch("https://www.omdbapi.com/?apikey=" + api + "&t=" + name);
        const movies = await response.json();
        return movies
    }
    logMovies().then(movies => {
        res.render("individual", { data: movies });; // fetched movies
    });
})

app.listen(process.env.PORT||3000, () => {
    console.log("Chalu ho gaya hai");
})


