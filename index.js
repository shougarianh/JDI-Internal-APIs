const express = require('express');
const { getRealtyList } = require('./realtycommunicator');

const app = express();
const port = 3000;

app.use(express.json()); // For parsing application/json

app.get('/getForSaleByZipcodeRadius', async (req, res) => {
  const { zipcode, radius } = req.query;

  if (!zipcode || !radius) {
    return res.status(400).json({ error: 'Please provide both zipcode and radius as query parameters' });
  }

  const bodyParams = {
    limit: 200,
    offset: 0,
    postal_code: zipcode,
    radius: parseFloat(radius),
    status: ['for_sale', 'ready_to_build'],
    sort: {
      direction: 'desc',
      field: 'list_date'
    }
  };

  try {
    const data = await getRealtyList(bodyParams);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(`Error fetching data from Realty API: ${error.message}`);
  }
});

app.get('/getForRentByZipcodeRadius', async (req, res) => {
  const { zipcode, radius } = req.query;

  if (!zipcode || !radius) {
    return res.status(400).json({ error: 'Please provide both zipcode and radius as query parameters' });
  }

  const bodyParams = {
    limit: 200,
    offset: 0,
    postal_code: zipcode,
    radius: parseFloat(radius),
    status: ['for_rent'],
    sort: {
      direction: 'desc',
      field: 'list_date'
    }
  };

  try {
    const data = await getRealtyList(bodyParams);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(`Error fetching data from Realty API: ${error.message}`);
  }
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
// http://localhost:3000/getForSaleByZipcodeRadius?zipcode=01760&radius=10
// http://localhost:3000/getForRentByZipcodeRadius?zipcode=01760&radius=10