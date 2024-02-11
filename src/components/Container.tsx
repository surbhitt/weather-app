import { useSearchParams } from "react-router-dom";
import Bar from "./Bar";
import WeatherCard from "./WeatherCard";
import CityGrid from "./container-comp/Grid";

export default function Container() {
  const [searchParams, setSearchParams] = useSearchParams();
  const loc = searchParams.get("loc") ?? "";
  const unit = searchParams.get("unit") ?? "";

  return (
    <div className="w-11/12 grid gap-3 xl:w-4/5 2xl:w-2/3">
      <Bar searchParams={searchParams} setSearchParams={setSearchParams} />
      <div className="w-full">
        {loc ? <WeatherCard unit={unit} /> : <CityGrid unit={unit} />}
      </div>
    </div>
  );
}
