import { useSearchParams } from "react-router-dom";
import Bar from "./Bar";
// import WeatherCard from "./WeatherCard";
import CityGrid from "./container-comp/Grid";
import { useState } from "react";

export default function Container() {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [loc] = useState(searchParams.get("loc") ?? "");
  const [unit] = useState(searchParams.get("unit") ?? "");

  return (
    <div className="min-w-[300px] w-5/6 lg:w-2/3 grid gap-3">
      <Bar searchParams={searchParams} setSearchParams={setSearchParams} />
      <div className="w-full">
        <CityGrid unit={unit} />
        {/* <WeatherCard /> */}
      </div>
    </div>
  );
}
