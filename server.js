const express = require("express");
const axios = require("axios");
const app = express();
// 3 lines for setup server

app.set("view engine", "ejs");
// setup engine using ejs
// Serve the public folder as static files(css files)
app.use(express.static("public"));

// Render the index template with default values for weather and error
// our homepage
app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

// Handle the /weather route
app.get("/weather", async (req, res) => {
  // Get the city from the query parameters
  const city = req.query.city;
  const apiKey = "f1af8c0fc92b9b4d8776d59561dd38c2";
// 12 to 22 lines is a route to get the weather
  // Add your logic here to fetch weather data from the API
  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  // q = query means lattitude and longitude
  let weather;
  let error = null;
  try {       
    const response = await axios.get(APIUrl);
    weather = response.data;
    // http request
  } catch (error) {
    weather = null;
    error = "Error, Please try again";
  }
  // Render the index template with the weather data and error message
  res.render("index", { weather, error });
});

// Start the server and listen on port 3000 or the value of the PORT environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
