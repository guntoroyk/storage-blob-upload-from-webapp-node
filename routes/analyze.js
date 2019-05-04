if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const
      express = require('express')
    , router = express.Router()
    , request = require('request')
;

// Replace <Subscription Key> with your valid subscription key.
const subscriptionKey = '061d02d11989427db753a9fc97c3c0f2';

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
const uriBase =
    'https://southeastasia.api.cognitive.microsoft.com/vision/v2.0/analyze';

const imageUrl = ????????????;

// Request parameters.
const params = {
    'visualFeatures': 'Categories,Description,Color',
    'details': '',
    'language': 'en'
};

const options = {
    uri: uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
};

let jsonResponse;

request.post(options, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
    return;
  }
  jsonResponse = JSON.parse(body);
  console.log('JSON Response\n');
  console.log(jsonResponse);
});

router.get('/', function(req, res){
    res.render('analyzed', { 
        description: jsonResponse.description.captions[0].text
    });
});


module.exports = router;