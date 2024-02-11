import { useSearchParams } from "react-router-dom";
import Bar from "./Bar";
import WeatherCard from "./WeatherCard";
import CityGrid from "./container-comp/Grid";

export default function Container() {
  const [searchParams, setSearchParams] = useSearchParams();
  const loc = searchParams.get("loc") ?? "";
  const unit = searchParams.get("unit") ?? "";

  return (
    <div className="min-w-[300px] w-5/6 lg:w-2/3 grid gap-3">
      <Bar searchParams={searchParams} setSearchParams={setSearchParams} />
      <div className="w-full">
        {loc ? <WeatherCard unit={unit} /> : <CityGrid unit={unit} />}
      </div>
    </div>
  );
}
