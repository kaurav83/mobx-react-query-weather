import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { api } from '../api/api';
import { store } from '../lib/mobx';

export const useWeather = () => {
    const query = useQuery('weather', api.getWeather);
    const { data, isFetched } = query;

    return {
        weather: data && Object.keys(data).length ? data.slice(0, 7) : [],
        isFetched,
    };
};
