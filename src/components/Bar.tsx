import { useSearchParams } from "react-router-dom";
import UnitSwitch from "./UnitSwitch";

export default function Bar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const loc = searchParams.get("loc");

  const handleRemoveLoc = () => {
    console.log("remove");
    searchParams.delete("search");
  };

  return (
    <div className="flex justify-between">
      {loc ? (
        <div className="flex items-center gap-2 border border-gray-400 border-solid w-fit h-7 pl-2 rounded text-sm">
          <p>{loc}</p>
          <div
            className="flex items-center h-full hover:bg-gray-100 rounded-r cursor-pointer"
            onClick={handleRemoveLoc}>
            <div className="h-full border-l-[1px] border-solid border-gray-500" />
            <img src="/cancel.svg" className="h-2 w-2 mx-2" />
          </div>
        </div>
      ) : (
        <div className="text-sm flex items-center gap-2 h-7">
          <div className="w-fit text-gray-500">Top searched locations </div>
          <img src="/location.svg" className="h-4 w-4" />
        </div>
      )}
      <UnitSwitch
        loc={loc ?? ""}
        unit={searchParams.get("unit") ?? ""}
        setSearchParams={setSearchParams}
      />
    </div>
  );
}
