import React, { useEffect, useState } from "react";
import { BG_IMG } from "../config";
import { API_KEY, Weather_API } from "../config";
import Chart from "./Chart";
const Home = () => {
    const [apiData, setApiData] = useState(null);
    const [search, setSearch] = useState('');
    const [err, setErr] = useState('');
    const [isCelsius, setIsCelsius] = useState(true);
    const [temp, setTemp] = useState("");
    const [maxTemp, setMaxTemp] = useState(null);
    const [minTemp, setMinTemp] = useState(null);
    const [dark, setDark] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(Weather_API + search + API_KEY
            )
            const json = await res.json();
            if (res?.ok) {
                setApiData(json);
                setTemp(json?.main?.temp);
                setMaxTemp(json?.main?.temp_max);
                setMinTemp(json?.main?.temp_min);
            }
            if (json.cod === "404" || json.cod === "400") setErr(json.message);
            else setErr("");
        }
        fetchData()
    }, [search])
    const toggleUnits = () => {
        setIsCelsius(!isCelsius);
    };
    const toggleTheme = () => {
        setDark(!dark);
    }
    const tempConversion = (val) => (isCelsius ? (val - 273.15 + " °C") : ((val - 273.15) * (9 / 5) + 32 + " °F"))
    const isTempValReceived = (temperature) => (temperature ? tempConversion(temperature) : "")

    return (
        <div className={`p-2 ${dark ? "bg-[#040D28]" : "bg-[#2E4874]"}`}>
            <div className={`flex justify-evenly shadow-xl rounded-2xl ${dark ? "bg-[#2E4874]" : "bg-[#947FAF]"} `}>
                {/* navbar */}
                <div className="mr-80 font-bold p-2 h-[70px] text-white text-4xl">Weather Forecast</div>
                <button onClick={toggleTheme} className="text-white">Switch Theme</button>
                <div className="ml-80">
                    <input
                        className="p-1 m-1 border rounded-lg" type="text"
                        placeholder="search city"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="text-white ml-2">{err}</div>
                </div>

            </div>
            <div className="mt-2 relative">
                <img className="w-full h-80 rounded-3xl shadow-xl object-cover" src={BG_IMG} alt="bg-img" />
                <div className="absolute ml-64 -mt-10">
                    <button onClick={toggleUnits} className="text-white border rounded-lg p-2 shadow-sm shadow-gray-200">Units</button>
                </div>
            </div>
            <div className="flex">
                <div className="h-80 w-2/5 mx-2 my-4">
                    <div className="flex flex-wrap gap-5 my-4">
                        <div className="text-white h-32 w-44 bg-slate-800 rounded-xl justify-center items-center shadow-md shadow-gray-200">
                            <p className="text-center mt-8">
                                Temperature
                                <br />
                                {isTempValReceived(temp)}
                            </p>
                        </div>
                        <div className="text-white h-32 w-44 bg-slate-800 rounded-xl justify-center shadow-md shadow-gray-200">
                            <p className="text-center mt-8">
                                Minimum temp
                                <br />
                                {isTempValReceived(minTemp)}
                            </p>
                        </div>
                        <div className="text-white h-32 w-44 bg-slate-800 rounded-xl justify-center shadow-md shadow-gray-200">
                            <p className="text-center mt-8">
                                Maximum temp
                                <br />
                                {isTempValReceived(maxTemp)}
                            </p>
                        </div>
                        <div className="text-white h-32 w-44 bg-slate-800 rounded-xl justify-center items-center shadow-md shadow-gray-200">
                            <p className="text-center mt-8">
                                Humidity
                                <br />
                                {apiData && apiData.main.humidity + "%"}
                            </p>
                        </div>
                        <div className="text-white h-32 w-44 bg-slate-800 rounded-xl justify-center items-center shadow-md shadow-gray-200">
                            <p className="text-center mt-8">
                                wind speed  <br />{apiData && apiData.wind.speed + " m/s"}


                            </p>
                        </div>
                        <div className="text-white h-32 w-44 bg-slate-800 rounded-xl justify-center items-center shadow-md shadow-gray-200">
                            <p className="text-center mt-8">
                                wind direction <br /> {apiData && apiData.wind.deg + "° rel to N"}

                            </p>
                        </div>

                    </div>
                </div>
                <div className="h-[275px] w-3/5 mx-5 mt-8 bg-slate-800 rounded-xl justify-center items-center shadow-md shadow-gray-200">
                    <Chart search={search} />
                </div>

            </div>

        </div>
    )
}

export default Home