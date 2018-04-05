require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const API_KEY = process.env.API_KEY;
const API_URL = 'https://opendata.uta.fi:8443/apiman-gateway/UTA/opintojaksot/1.0';

axios.defaults.headers.get['X-API-key'] = API_KEY;

const getCourses = async () => {
    try {
        const response = await axios.get(API_URL);
        const data = await response.data;
        // TODO: validate data before writing
        fs.writeFile('./courses.json', JSON.stringify(data), err => {
            if (err) throw Error(err);
        });

    } catch (e) {
        throw Error(e);
    }
}

console.info('\n\nUpdating courses...\n\n');
getCourses()
.then(() => console.info('\n\nCourses updated!\n\n'))
.catch(err => console.error(err));
