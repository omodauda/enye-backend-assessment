const express = require('express');
const axios = require('axios');

const app = express();

app.get('/api/rates', async (req, res) => {

  let requestOptions;

  if(req.query){
    const {base, currency} = req.query;
    requestOptions = {
      params: {
        base,
        symbols: currency
      }
    };
  };
  
  try {
    const {data} = await axios.get('https://api.exchangeratesapi.io/latest', requestOptions);
    
    if(!data){
      return res
        .status(500)
        .json({
          status: 'fail',
          error: 'unable to fetch data currently, pls try again'
        });
    };

    const {base, date, rates} = data;

    res
    .status(200)
    .json({
      results: {
        base,
        date,
        rates
      }
    });
  } catch (error){
    return res
      .status(400)
      .json({
        status: "fail",
        error: error.message
      });
  };
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});