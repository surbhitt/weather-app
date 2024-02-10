import Bar from "./Bar";
import WeatherCard from "./WeatherCard";

export default function Container() {
  return (
    <div className="min-w-[300px] w-5/6 lg:w-2/3 grid gap-3">
      <Bar />
      <div className="p-2 w-full border border-gray-500 rounded border-solid">
        <WeatherCard />
      </div>
    </div>
  );
}
