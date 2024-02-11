import { useEffect, useState } from "react";
import { weatherApiInt } from "../../../interface";
// import palette from "./colorPalette";
import { calculateTemp, calculateAccent } from "../../../utils/util-funcs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../@/components/ui/tooltip";

const apiKey = ""; // import.meta.env.VITE_WEATHER_API;

const cities = [
  "amsterdam",
  "athens",
  "barcelona",
  "beijing",
  "berlin",
  "copenhagen",
  "dublin",
  "havana",
  "istanbul",
  "london",
  "paris",
  "rome",
  "new-york",
  "rio-de-janeiro",
];

export default function CityGrid({ unit }: { unit: string }) {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-2 gap-2">
      {cities.map((loc, idx) => (
        <Card key={idx} unit={unit} loc={loc} />
      ))}
    </div>
  );
}

function Card({ unit, loc }: { unit: string; loc: string }) {
  const [apiData, setApiData] = useState<weatherApiInt>();

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

  return (
    <div
      className={`flex justify-between w-full h-56 text-lg md:text-xl rounded`}>
      <img src={`/citiesIllustration/${loc}.jpg`} className="opacity-80" />
      <div className="border border-gray-400 rounded-r-xl border-solid hidden md:block w-full">
        <p
          className={`${
            apiData && apiData.cod === 200
              ? `${calculateAccent(
                  apiData.main.temp_max
                )} text-gray-100 font-bold`
              : "text-gray-500 font-semibold"
          } flex items-center justify-center w-full h-16 text-center p-2 border-b-[1px] border-solid border-gray-400 rounded-tr-xl`}>
          {loc[0].toLocaleUpperCase() + loc.substring(1)}
          {iconUrl && <img src={iconUrl} className="h-10 w-10" />}
        </p>
        <div className="flex flex-col justify-center mt-5">
          {apiData && apiData.cod === 200 ? (
            <CardToolTip weather={apiData.weather[0].description}>
              <div className="mx-5 grid grid-cols-5 text-base">
                <div className="col-span-3 text-left text-secondary-500">
                  Maximum
                </div>
                <div className="text-right col-span-2">
                  {calculateTemp(apiData.main.temp_max, unit)}
                </div>
                <div className="col-span-3 text-left text-secondary-500">
                  Minimum
                </div>
                <div className="text-right col-span-2">
                  {calculateTemp(apiData.main.temp_min, unit)}
                </div>
                <div className="col-span-3 text-left text-secondary-500">
                  Wind Speed
                </div>
                <div className="text-right col-span-2">
                  {apiData.wind.speed ?? "N/A"}
                  {" m/s"}
                </div>
                <div className="col-span-3 text-left text-secondary-500">
                  Humidity
                </div>
                <div className="text-right col-span-2">
                  {apiData.main.humidity ?? "N/A"}
                  {" %"}
                </div>
              </div>
            </CardToolTip>
          ) : (
            <div className="text-sm text-gray-500 flex flex-col items-center">
              <img src="/err.svg" className="h-20 w-20 opacity-70" />
              Data Unavailable
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const CardToolTip = ({
  children,
  weather,
}: {
  children: React.ReactElement;
  weather: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className="flex flex-col items-center bg-white z-20 bg-opacity-100 p-2 rounded border border-solid border-black">
          <div>
            The weather at this location is{" "}
            <span className="italic">{weather}</span>
          </div>
          <div className="text-xs text-gray-600">
            click on the card to expand
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
