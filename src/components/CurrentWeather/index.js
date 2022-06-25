import React from 'react';
import { observer } from 'mobx-react-lite';
import { store } from '../../lib/mobx';
import { CHECKED } from '../../constants';

const CurrentWeather = observer(() => {
    return (
        <>
            {
                store.submited === CHECKED && !store.allData?.weather.length
                    ? <div className = 'forecast'>
                        <p className = 'message'>По заданным критериям нет доступных дней!</p>
                    </div>
                    : <div className = 'current-weather'>
                        <p className = 'temperature'>{ store.selectTemperature }</p>
                        <p className = 'meta'>
                            <span className = 'rainy'>%{ store.selectRainProbability }</span>
                            <span className = 'humidity'>%{ store.selectHumidity }</span>
                        </p>
                    </div>
            }
        </>
    );
});

export default CurrentWeather;
