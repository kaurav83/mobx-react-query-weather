import React, { useEffect } from 'react';
import { useWatch, useForm } from 'react-hook-form';
import { store } from '../../../lib/mobx';

const Checkbox = ({
    weatherState, type, handleClick, currentType, control,
}) => {
    const radioWeatherState = useWatch({
        control,
        name:         'radio',
        defaultValue: '',
    });

    const minTemperature = useWatch({
        control,
        name:         'minTemperature',
        defaultValue: '',
    });

    const maxTemperature = useWatch({
        control,
        name:         'maxTemperature',
        defaultValue: '',
    });

    useEffect(() => {
        store.setFilterValues({
            type: radioWeatherState,
            minTemperature,
            maxTemperature,
        });
    }, [radioWeatherState]);

    const clickCheck = () => {
        handleClick(type);
    };

    return (
        <span
            className = { `checkbox ${type === currentType ? 'selected' : ''}` }
            onClick = { clickCheck }
            data-type = { type }>{ weatherState }</span>
    );
};

export default Checkbox;
