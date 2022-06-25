// Components
import Filter from './components/Filter';
import Head from './components/Head';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';

// Instruments

export const App = () => {
    return (
        <main>
            <Filter />
            <Head />
            <CurrentWeather />
            <Forecast />
        </main>
    );
};
