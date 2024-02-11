import { cities } from "../../dummy-data/city";

export default function CityTable() {
  return (
    <table className="ml-1.5 sm:ml-0 text-xs md:text-base border border-solid mt-10 w-full">
      <tr className="border-b-[1px] border-solid border-gray-400">
        <td className="text-center font-bold p-2 w-20">ID</td>
        <td className="font-bold p-2 w-56">State</td>
        <td className="font-bold p-2 w-32 text-center">Country</td>
        <td className="font-bold p-2 text-center">Max. Temp.</td>
        <td className="font-bold p-2 text-center">Min. Temp.</td>
      </tr>
      {cities.map((city, idx) => {
        return (
          <tr key={idx} className="">
            <td className="p-2 text-center">{idx}</td>
            <td className="p-2">{city.name}</td>
            <td className="p-2 text-center">{city.country}</td>
            <td className="p-2 text-center">{city.maxT}</td>
            <td className="p-2 text-center">{city.minT}</td>
          </tr>
        );
      })}
    </table>
  );
}
