import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { weatherApiInt } from "../../interface";
import {
  calculateAccent,
  calculateTemp,
  toTitleCase,
} from "../../utils/util-funcs";
import CityTable from "./CityTable";
import Chart from "./Chart";

export default function WeatherCard({ unit }: { unit: string }) {
  const [searchParams] = useSearchParams();
  const [loc] = useState(searchParams.get("loc") ?? "");

  const [apiData, setApiData] = useState<weatherApiInt>();
  const apiKey = import.meta.env.VITE_WEATHER_API;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${loc
    .split("-")
    .join("+")}&appid=${apiKey}`;

  useEffect(() => {
    try {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          setApiData(data);
        });
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const iconUrl =
    apiData && apiData.cod === 200
      ? `https://openweathermap.org/img/wn/${apiData?.weather[0].icon}@2x.png`
      : "";

  console.log(apiData);
  if (!apiData || apiData.cod !== 200) return null;
  return (
    <div
      className={`${calculateAccent(
        apiData?.main.temp ?? 0
      )} bg-opacity-60 text-gray-500 border border-solid pr-3 md:px-14 lg:px-44 py-5 md:py-10 rounded-xl`}>
      <div className="flex justify-between">
        <div className="flex">
          <img src={iconUrl} className="w-20 h-20 md:h-28 md:w-28" />
          <div className="-ml-3">
            <div className="gap-1 flex md:text-3xl">
              <span className="font-semibold text-white">{apiData?.name}</span>
              <span className="text-gray-500">
                {calculateTemp(apiData?.main.temp ?? 0, unit)}
              </span>
            </div>
            <div className="text-xs md:text-sm mt-1">
              <div className="flex justify-between">
                <span className="text-gray-500">Max. Temp.</span>
                <span className="text-white font-semibold">
                  {calculateTemp(apiData?.main.temp_max ?? 0, unit)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Min. Temp.</span>
                <span className="text-white font-semibold">
                  {calculateTemp(apiData?.main.temp_min ?? 0, unit)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Humidity</span>
                <span className="text-white font-semibold">
                  {apiData?.main.humidity} %
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Pressure</span>
                <span className="text-white font-semibold">
                  {apiData?.main.pressure} hPa
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-sm md:text-base">
          <div className="flex gap-2">
            <span className="text-white underline underline-offset-4 font-semibold">
              {toTitleCase(apiData?.weather[0].description)}
            </span>
          </div>
          <div className="flex gap-2 mt-2">
            <span className="text-gray-500">Cloudiness</span>
            <span className="text-white font-semibold">
              {apiData?.clouds.all} %
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-gray-500">Wind</span>
            <span className="text-white font-semibold">
              {apiData?.wind.speed} m/s
            </span>
          </div>
        </div>
      </div>
      <CityTable />
      <Chart />
    </div>
  );
}
