import { SetURLSearchParams } from "react-router-dom";

export default function UnitSwitch({
  loc,
  unit,
  setSearchParams,
}: {
  loc: string | null;
  unit: string;
  setSearchParams: SetURLSearchParams;
}) {
  const handleUnitChange = (unit: string) => {
    if (loc) setSearchParams({ unit, loc });
    else setSearchParams({ unit });
  };

  return (
    <div className="text-sm flex items-center justify-center h-7 border border-solid border-gray-400 rounded">
      <div
        className={`cursor-pointer flex items-center justify-center h-full px-2 rounded-l ${
          unit !== "far" ? "bg-[#BD93F9] text-white font-bold" : ""
        }`}
        onClick={() => handleUnitChange("cel")}>
        &deg; C
      </div>
      <div className="h-full border-l-[1px] border-solid border-gray-400"></div>
      <div
        className={`cursor-pointer flex items-center justify-center h-full px-2 rounded-r ${
          unit === "far" ? "bg-[#BD93F9] text-white font-bold" : ""
        }`}
        onClick={() => handleUnitChange("far")}>
        &deg; F
      </div>
    </div>
  );
}
