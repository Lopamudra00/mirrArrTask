import { useState, useEffect } from 'react';
import { Weather_Forecast_API, Weather_Forecast_API_KEY } from '../config';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = (props) => {
    console.log(props)
    const [forecastData, setForecastData] = useState(null);
    useEffect(() => {
        const fetchForecast = async () => {
            try {
                const response = await fetch(Weather_Forecast_API + props.search + Weather_Forecast_API_KEY);
                const json = await response.json();
                console.log('JSON Data:', json);
                if (response.ok) {
                    setForecastData(json);
                } else {
                    console.error('Error:', json.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchForecast();
    }, [props])
    const formatChartData = () => {
        if (forecastData && forecastData.list) {
            return forecastData.list.map(entry => ({
                date: new Date(entry.dt * 1000).toLocaleString(),
                temperature: entry.main.temp,
                tempMin: entry.main.temp_min,
                tempMax: entry.main.temp_max,
            }));
        }
        return [];
    };

    return (
        <ResponsiveContainer
            width="100%">
            <LineChart
                width={550}
                height={200}
                data={formatChartData()}
                margin={{
                    top: 20,
                    right: 40,
                    bottom: 10,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis ticks={[100, 200, 300, 400, 500]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temperature" stroke="#5C6582" name="Temperature" />
                <Line type="monotone" dataKey="tempMin" stroke="#82ca9d" name="Min Temperature" />
                <Line type="monotone" dataKey="tempMax" stroke="#ff7300" name="Max Temperature" />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default Chart