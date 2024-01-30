import React, { useEffect, useState } from "react";
import { BG_IMG } from "../config";
import { API_KEY, Weather_API } from "../config";
import Chart from "./Chart";
const Home = () => {

    const [apiData, setApiData] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(Weather_API + search + API_KEY
            )
            const json = await res.json();
            console.log(json)
            if (res.ok) {
                setApiData(json)
            }
        }
        fetchData()
    }, [search])


    return (
        <div className="p-2 bg-[#040D28]">
            <div className="flex justify-evenly shadow-xl">
                {/* navbar */}
                <div className="mr-80 font-bold p-2 text-white text-4xl">Weather Forecast</div>
                <div className="ml-80">
                    <input
                        className="p-1 border rounded-lg" type="text"
                        placeholder="search city"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

            </div>
            <div className="mt-2">
                <img className="w-full h-80 rounded-b-3xl shadow-xl" src={BG_IMG} />
            </div>
            <div className="flex">
                <div className="h-80 w-2/5 mx-2 my-4">
                    <div className="flex flex-wrap gap-5 my-4">
                        <div className="text-white h-32 w-44 bg-slate-800 rounded-xl justify-center items-center">
                            <p className="text-center mt-8">
                                Temperature
                                <br />
                                {apiData && (apiData.main.temp) + "K"}

                            </p>
                        </div>
                        <div className="text-white h-32 w-44 bg-slate-800 rounded-xl justify-center">
                            <p className="text-center mt-8">
                                Minimun temp
                                <br />
                                {apiData && (apiData.main.temp_min).toFixed(1) + " °F"}

                            </p>
                        </div>
                        <div className="text-white h-32 w-44 bg-slate-800 rounded-xl justify-center ">
                            <p className="text-center mt-8">
                                Maxi temp
                                <br />
                                {apiData && (apiData.main.temp_max).toFixed(1) + " °F"}
                            </p>
                        </div>
                        <div className="text-white h-32 w-44 bg-slate-800 rounded-xl justify-center items-center">
                            <p className="text-center mt-8">
                                Humidity
                                <br />
                                {apiData && apiData.main.humidity + "%"}
                            </p>
                        </div>
                        <div className="text-white h-32 w-44 bg-slate-800 rounded-xl justify-center items-center">
                            <p className="text-center mt-8">
                                wind speed  <br />{apiData && apiData.wind.speed + " m/s"}


                            </p>
                        </div>
                        <div className="text-white h-32 w-44 bg-slate-800 rounded-xl justify-center items-center">
                            <p className="text-center mt-8">
                                wind direction <br /> {apiData && apiData.wind.deg + "°"}

                            </p>
                        </div>

                    </div>
                </div>
                <div className="h-[275px] w-3/5 mx-5 mt-8 bg-slate-800 rounded-xl justify-center items-center">
                    <Chart search={search} />
                </div>

            </div>

        </div>
    )
}

export default Home