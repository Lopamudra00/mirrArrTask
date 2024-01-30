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
                    <div className="flex flex-wrap gap-5">
                        <div className="text-white h-28 w-60 bg-slate-800 rounded-xl justify-center">
                            <p className="text-center mt-8">
                                Minimun temp
                                <br />
                                {apiData && apiData.main.temp_min}

                            </p>
                        </div>
                        <div className="text-white h-28 w-60 bg-slate-800 rounded-xl justify-center ">
                            <p className="text-center mt-8">
                                Maxi temp
                                <br />
                                {apiData && apiData.main.temp_max}
                            </p>
                        </div>
                        <div className="text-white h-28 w-60 bg-slate-800 rounded-xl justify-center items-center">
                            <p className="text-center mt-8">
                                Humidity
                                <br />
                                {apiData && apiData.main.humidity}
                            </p>
                        </div>
                        <div className="text-white h-28 w-60 bg-slate-800 rounded-xl justify-center items-center">
                            <p className="text-center mt-8">
                                wind speed and dir.
                                <br />
                                {apiData && apiData.wind.speed}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="h-80 w-3/5 mx-2 my-4">
                    <Chart search={search} />
                </div>

            </div>

        </div>
    )
}

export default Home