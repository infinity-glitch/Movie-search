const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const movie = req.body.movieSearch.trim(); // Ensure to trim spaces
    const year = req.body.year.trim();

    if (!movie || !year) {
        res.send("<p>Please provide both a movie title and a year.</p>");
        return;
    }

    // Construct URL for searching the movie
    const searchUrl = `https://www.omdbapi.com/?apikey=3852891&s=${encodeURIComponent(movie)}&y=${encodeURIComponent(year)}`;

    https.get(searchUrl, function (response) {
        let dataChunks = "";

        response.on("data", function (chunk) {
            dataChunks += chunk;
        });

        response.on("end", function () {
            try {
                const movieData = JSON.parse(dataChunks);

                if (!movieData.Search || movieData.Search.length === 0) {
                    res.send("<p>No movies found. Please try a different query.</p>");
                    return;
                }

                // Get the first movie's IMDb ID
                const id = movieData.Search[0].imdbID;
                const detailsUrl = `https://www.omdbapi.com/?apikey=3852891&i=${id}`;

                // Fetch details for the specific movie
                https.get(detailsUrl, function (response) {
                    let detailsChunks = "";

                    response.on("data", function (chunk) {
                        detailsChunks += chunk;
                    });

                    response.on("end", function () {
                        try {
                            const movieDetails = JSON.parse(detailsChunks);

                            const releaseDate = movieDetails.Released || "N/A";
                            const runtime = movieDetails.Runtime || "N/A";
                            const poster = movieDetails.Poster || "";
                            const boxOffice = movieDetails.BoxOffice || "N/A";

                            // Construct the download link to 1337x (search for movie title and year)
                            const downloadLink = `https://www.1377x.to/search/${encodeURIComponent(movie)}+${encodeURIComponent(year)}/1/`;

                            // Ensure poster exists before adding
                            let posterHtml = poster ? `<img src="${poster}" alt="Movie Poster">` : "<p>Poster not available.</p>";

                            // Constructing the HTML response with a Download button
                            const resultHtml = `
                                <html>
                                    <head>
                                        <title>${movie} Details</title>
                                        <style>
                                            body {
                                                font-family: Arial, sans-serif;
                                                background-color: #f4f4f4;
                                                text-align: center;
                                                margin: 0;
                                                padding: 20px;
                                            }
                                            h1 {
                                                color: #333;
                                            }
                                            .movie-details {
                                                background-color: #fff;
                                                border-radius: 8px;
                                                padding: 20px;
                                                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                                                display: inline-block;
                                                text-align: left;
                                                width: 300px;
                                            }
                                            img {
                                                width: 100%;
                                                border-radius: 8px;
                                            }
                                            h6 {
                                                margin: 10px 0;
                                            }
                                            .download-button {
                                                margin-top: 20px;
                                            }
                                            .button {
                                                background-color: #007BFF;
                                                color: white;
                                                border: none;
                                                border-radius: 5px;
                                                padding: 10px 20px;
                                                text-decoration: none;
                                                font-size: 16px;
                                                cursor: pointer;
                                            }
                                            .button:hover {
                                                background-color: #0056b3;
                                            }
                                        </style>
                                    </head>
                                    <body>
                                        <h1>${movie} (${year})</h1>
                                        <div class="movie-details">
                                            <h6><strong>Release Date:</strong> ${releaseDate}</h6>
                                            <h6><strong>Runtime:</strong> ${runtime}</h6>
                                            <h6><strong>Box Office:</strong> ${boxOffice}</h6>
                                            ${posterHtml}
                                        </div>
                                        <div class="download-button">
                                            <a href="${downloadLink}" target="_blank" class="button">Download</a>
                                        </div>
                                    </body>
                                </html>
                            `;

                            res.send(resultHtml); // Send the final result

                        } catch (error) {
                            console.error("Error parsing movie details:", error);
                            res.send("<p>Error fetching movie details. Please try again later.</p>");
                        }
                    });
                });
            } catch (error) {
                console.error("Error parsing search results:", error);
                res.send("<p>Error fetching movie data. Please try again later.</p>");
            }
        });
    }).on("error", function (e) {
        console.error("Error with the OMDB API request:", e);
        res.send("<p>There was an error connecting to the OMDB API. Please try again later.</p>");
    });
});

// Start the server
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
