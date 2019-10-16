import axios from 'axios';

const callNBPapi = async () => {
    let res, err;
    await axios.get('http://api.nbp.pl/api/exchangerates/rates/a/eur/?format=json')
    .then((response) => {
        res = response;
    })
    .catch((error) => {
        err = { error: error.message || 'Unknown error' };
    });

    return { res, err };
};

export default callNBPapi;