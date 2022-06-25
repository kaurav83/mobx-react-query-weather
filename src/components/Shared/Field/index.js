import React, { useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { store } from '../../../lib/mobx';

const Field = ({
    label, register, typeField, control,
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
    }, [minTemperature, maxTemperature]);

    return (
        <p className = 'custom-input'>
            <label htmlFor = 'min-temperature'>{ label }</label>
            <input
                disabled = { store.submited === 'CHECKED' }
                id = 'min-temperature'
                type = { typeField }
                { ...register } />
        </p>
    );
};

Field.defaultProps = {
    type: 'text',
};

export default Field;
