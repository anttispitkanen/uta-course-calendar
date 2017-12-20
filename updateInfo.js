require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const API_KEY = process.env.API_KEY;
const API_URL = 'https://opendata.uta.fi:8443/apiman-gateway/UTA/opintojaksot/1.0';

axios.defaults.headers.get['X-API-key'] = API_KEY;

// FIXME: try this
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
// TODO: ok so this works

const getCourses = async () => {
    try {
        const response = await axios.get(API_URL);
        const data = await response.data;
        fs.writeFile('./courses.json', JSON.stringify(data), err => {
            if (err) console.error(err);
        });

    } catch (e) {
        console.error(e);
    }
}

getCourses();
