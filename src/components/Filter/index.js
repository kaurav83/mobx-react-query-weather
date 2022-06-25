import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';
import { store } from '../../lib/mobx';
import Checkbox from '../Shared/Checkbox';
import Field from '../Shared/Field';
import Button from '../Shared/Button';
import { CANCEL, DEFAULT, CHECKED } from '../../constants';

const Filter = observer(() => {
    const [typeWeather, setTypeWeather] = useState('');

    const selectedFilters = Object.keys(store.filterValuesObject)
        .filter((item) => store.filterValuesObject[ item ].length);

    const form = useForm({
        mode:          'onTouched',
        defaultValues: {
            minTemperature: '',
            maxTemperature: '',
            radio:          '',
        },
    });

    const handleClick = (type) => {
        if (store.submited !== CHECKED) {
            form.setValue('radio', type);
            setTypeWeather(type);
        }
    };

    const handleSubmitFilter = form.handleSubmit(() => {
        if (store.submited === DEFAULT) {
            const { type, minTemperature, maxTemperature } = store.filterValuesObject;
            const { weather } = store.allData;

            const filteredList = weather && weather.length && weather.filter((item) => {
                const isCorrectType = type ? item.type === type : true;

                const isCorrectMinTemperature = minTemperature
                    ? Number(minTemperature) <= Number(item.temperature) : true;

                const isCorrectMaxTemperature = maxTemperature
                    ? Number(maxTemperature) >= Number(item.temperature) : true;

                return (
                    isCorrectType
                    && isCorrectMinTemperature
                    && isCorrectMaxTemperature
                );
            });

            store.setData({ weather: filteredList, isFetched: true });
            store.setIsSubmited(CHECKED);
        } else {
            store.setFilterValues({ type: '', minTemperature: '', maxTemperature: '' });
            setTypeWeather('');
            form.setValue('maxTemperature', '');
            form.setValue('minTemperature', '');
            store.setIsSubmited(CANCEL);
        }
    });

    return (
        <div>
            <form className = 'filter' onSubmit = { handleSubmitFilter }>
                <Checkbox
                    weatherState = 'Облачно'
                    handleClick = { handleClick }
                    control = { form.control }
                    type = 'cloudy'
                    currentType = { typeWeather } />
                <Checkbox
                    weatherState = 'Солнечно'
                    handleClick = { handleClick }
                    control = { form.control }
                    type = 'sunny'
                    currentType = { typeWeather } />
                <Field
                    label = 'Минимальная температура'
                    typeField = 'number'
                    control = { form.control }
                    register = { form.register('minTemperature') } />
                <Field
                    label = 'Максимальная температура'
                    typeField = 'number'
                    control = { form.control }
                    register = { form.register('maxTemperature') } />
                <Button
                    content = { store.submited === CHECKED ? 'Сбросить' : 'Отфильтровать' }
                    disabled = { !selectedFilters.length } />
            </form>
        </div>
    );
});

export default Filter;
