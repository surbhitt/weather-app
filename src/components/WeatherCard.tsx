import { useState } from "react";

export default function WeatherCard() {
  const [iconId, setIconId] = useState("");
  const iconUrl = `https://openweathermap.org/img/wn/${iconId}@2x.png`;
  console.log(iconUrl, setIconId);
  return <div>hello</div>;
}
