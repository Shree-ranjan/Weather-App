import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Typography, Paper, Grid } from '@mui/material';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user's current geolocation
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const API_KEY = '8dde96b0893eeff725de2d35e7bbc2ae'; // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key

          // Fetch weather data based on current geolocation
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
          );

          setWeatherData(response.data);
          setLoading(false);
        });
      } catch (error) {
        setError('Error fetching weather data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <CircularProgress />; // Show loading spinner while fetching data
  if (error) return <Typography variant="h6" color="error">{error}</Typography>; // Show error message if data fetch fails
  if (!weatherData) return null;

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>Current Weather</Typography>
          <Typography variant="h5">{weatherData.name}, {weatherData.sys.country}</Typography>
          <Typography variant="h3" style={{ marginTop: '20px' }}>
            {(weatherData.main.temp - 273.15).toFixed(1)}°C
          </Typography>
          <Typography variant="subtitle1" style={{ marginTop: '10px' }}>
            {weatherData.weather[0].main}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Weather;
