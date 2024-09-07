// realtycommunicator.js
const axios = require('axios');

const getRealtyList = async (bodyParams) => {
  const options = {
    method: 'POST', // Change to POST method
    url: 'https://realty-in-us.p.rapidapi.com/properties/v3/list', // Correct endpoint for POST
    headers: {
      'Content-Type': 'application/json', // Set the content type for the request body
      'X-RapidAPI-Key': 'b14746c117msh564e9da11785a5bp17a599jsne93f3709021f', // Your API key
      'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com'
    },
    data: bodyParams // Pass the body parameters here
  };

  try {
    const response = await axios.request(options);
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error in API Request:', error.response ? error.response.data : error.message);
    throw error;
  }
};

module.exports = { getRealtyList };
