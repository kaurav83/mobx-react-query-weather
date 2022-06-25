// Core
import axios from 'axios';
import { FORECAST_URL } from './config';

export const api = Object.freeze({
    async getWeather() {
        const { data } =  await axios.get(`${FORECAST_URL}`);

        return data.data;
    },
});
