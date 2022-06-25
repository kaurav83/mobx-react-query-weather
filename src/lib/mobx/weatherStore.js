// Core
import { makeAutoObservable } from 'mobx';
import { computedFn } from 'mobx-utils';
import { DEFAULT } from '../../constants';

export class WeatherStore {
    actualData = [];
    type = '';
    minTemperature = '';
    maxTemperature = '';
    isFiltered = false;
    selectedDayId = '';
    selectedMonth = '';
    dayMonth = '';
    selectedTemperature = '';
    selectedHumidity = '';
    selectedRainProbability = '';
    filterValues = '';
    isSubmit = DEFAULT;

    constructor() {
        this
            .filteredDays = computedFn((days) => {
                const filteredDays = days.filter((day) => {
                    const isCorrectType = this.type
                        ? this.type === day.type
                        : true;
                    const isCorrectMinTemperature = this.minTemperature
                        ? this.minTemperature <= String(day.temperature)
                        : true;
                    const isCorrectMaxTemperature = this.maxTemperature
                        ? this.maxTemperature >= String(day.temperature)
                        : true;

                    return (
                        isCorrectType
                    && isCorrectMinTemperature
                    && isCorrectMaxTemperature
                    );
                });

                return filteredDays;
            });

        makeAutoObservable(this);
    }

    setData(data) {
        this.actualData = data;
    }

    get allData() {
        return this.actualData;
    }

    get selectType() {
        return this.type;
    }

    setMinTemperature(temp) {
        this.minTemperature = temp;
    }

    setMaxTemperature(temp) {
        this.maxTemperature = temp;
    }

    applyFilter(filter) {
        if (filter.type) {
            this.type = filter.type;
        }

        if (filter.minTemperature) {
            this.minTemperature = filter.minTemperature;
        }

        if (filter.maxTemperature) {
            this.maxTemperature = filter.maxTemperature;
        }

        this.isFiltered = true;
    }

    get isFormBlocked() {
        return this.type === '' && this.minTemperature === '' && this.maxTemperature === '';
    }

    setSelectedCart = (obj) => {
        this.type = obj.type;
        this.selectedDayId = obj.id;
        this.selectedMonth = obj.month;
        this.dayMonth = obj.day;
        this.selectedTemperature = obj.temperature;
        this.selectedHumidity = obj.humidity;
        this.selectedRainProbability = obj.rain;
    }

    get selectDayId() {
        return this.selectedDayId;
    }

    get selectMonth() {
        return this.selectedMonth;
    }

    get selectDayMonth() {
        return this.dayMonth;
    }

    get selectTemperature() {
        return this.selectedTemperature;
    }

    get selectHumidity() {
        return this.selectedHumidity;
    }

    get selectRainProbability() {
        return this.selectedRainProbability;
    }

    setFilterValues(values) {
        this.filterValues = values;
    }

    get filterValuesObject() {
        return this.filterValues;
    }

    setIsSubmited(flag) {
        this.isSubmit = flag;
    }

    get submited() {
        return this.isSubmit;
    }

    resetFilter() {
        this.maxTemperature = '';
        this.minTemperature = '';
        this.type = '';
        this.isFiltered = false;
    }
}

export const store = new WeatherStore();
