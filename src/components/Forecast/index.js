import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useWeather } from '../../hooks';
import { store } from '../../lib/mobx';
import { CANCEL, DEFAULT, CHECKED } from '../../constants';

const Forecast = observer(() => {
    const data = useWeather();
    const { isFetched } = data;
    const [selector, setSelector] = useState('');
    const refElement = React.useRef(null);

    useEffect(() => {
        if (isFetched && store.submited === DEFAULT) {
            store.setData(data);
            const { isFetched: fetched, weather: weatherData } = store.allData;
            const firstItem = weatherData[ 0 ];
            setSelector(firstItem.id);

            store.setSelectedCart({
                id:          format(firstItem.day, 'eeee', { locale: ru }),
                month:       format(firstItem.day, 'MMMM', { locale: ru }),
                day:         format(firstItem.day, 'd', { locale: ru }),
                type:        firstItem.type,
                temperature: firstItem.temperature,
                humidity:    firstItem.humidity,
                rain:        firstItem.rain_probability,

            });
        }
    }, [isFetched, store.submited]);

    useEffect(() => {
        if (store.submited === CANCEL) {
            store.setData(data);
            const { isFetched: fetched, weather: weatherData } = store.allData;
            const firstItem = weatherData[ 0 ];
            setSelector(firstItem.id);
            store.setIsSubmited(DEFAULT);
        }

        if (store.submited === CHECKED && store.allData?.weather.length) {
            const { isFetched: fetched, weather: weatherData } = store.allData;
            const firstItem = weatherData[ 0 ];
            setSelector(firstItem.id);

            store.setSelectedCart({
                id:          format(firstItem.day, 'eeee', { locale: ru }),
                month:       format(firstItem.day, 'MMMM', { locale: ru }),
                day:         format(firstItem.day, 'd', { locale: ru }),
                type:        firstItem.type,
                temperature: firstItem.temperature,
                humidity:    firstItem.humidity,
                rain:        firstItem.rain_probability,
            });
        }
    }, [store.submited]);

    const handleClick = (item) => {
        setSelector(item.id);

        store.setSelectedCart({
            id:          format(item.day, 'eeee', { locale: ru }),
            month:       format(item.day, 'MMMM', { locale: ru }),
            day:         format(item.day, 'd', { locale: ru }),
            type:        item.type,
            temperature: item.temperature,
            humidity:    item.humidity,
            rain:        item.rain_probability,

        });
    };

    return (
        <div className = 'forecast'>
            {
                store.allData.isFetched && store.allData.weather.map((item) => {
                    const day = format(item.day, 'eeee', { locale: ru });

                    return (
                        <div
                            className = { `day ${item.type} ${selector === item.id ? 'selected' : ''}` }
                            key = { item.id }
                            onClick = { () => handleClick(item) }
                            ref = { refElement } >
                            <p>{ day }</p>
                            <span>{ item.temperature }</span>
                        </div>
                    );
                })
            }
        </div>
    );
});

export default Forecast;
