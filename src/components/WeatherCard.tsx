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
  const loc = searchParams.get("loc") ?? "";

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
  }, [loc]);

  const iconUrl =
    apiData && apiData.cod === 200
      ? `https://openweathermap.org/img/wn/${apiData?.weather[0].icon}@2x.png`
      : "";

  const sliceDesc = (desc: string) => {
    return desc.split(" ").slice(0, 2).join(" ");
  };

  if (!apiData)
    return (
      <div className="rounded-xl w-full h-96 bg-gray-300 flex flex-col gap-5 items-center justify-center">
        <div role="status" className="">
          <svg
            aria-hidden="true"
            className="w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
        <div> Loading...</div>
      </div>
    );

  if (apiData.cod === "404") {
    return (
      <div className="flex flex-col gap-2 rounded-xl w-full h-96 bg-gray-300 items-center justify-center">
        <p className="text-6xl font-bold text-gray-400">{apiData.cod}</p>
        <p className="text-lg font-bold text-gray-500">{apiData.message}</p>
      </div>
    );
  } else if (apiData.cod !== 200) {
    console.log("cod", apiData.cod);
    return (
      <div className="rounded-xl w-full h-96 bg-gray-300 flex items-center justify-center">
        <img src="/err.svg" className="h-32 w-32 opacity-70" />
        <div>
          <p>Could not load</p>
          <p className="text-xs">Check console</p>
        </div>
      </div>
    );
  }

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
            <span className="text-white text-ellipsis underline underline-offset-4 font-semibold">
              {sliceDesc(toTitleCase(apiData?.weather[0].description))}
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
      <Chart />
      <CityTable />
    </div>
  );
}
