import express from 'express';

const router = express.Router();

const SUPPORTED_CITIES = ['London', 'Tokyo', 'New York', 'Cairo', 'Montreal'];

router.get('/', (req, res) => {
    res.status(200).json({ cities: SUPPORTED_CITIES });
});

router.get("/:city", async (req, res) => {
  const { city } = req.params;

  try {
  const response = await fetch(
    `https://weather-proxy.freecodecamp.rocks/api/city/${city}`,
  );

  const data = await response.json();

  res.json({
    city: data.name,
    temperature: data.main.temp,
    description: data.weather[0].description,
  });
  } catch(error) {
    res
      .status(404)
      .json({ error: `Could not fetch weather data for "${city}".` });
  }
});
export default router;