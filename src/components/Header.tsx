import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Header() {
  const [loc, setLoc] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = () => {
    console.log("loc =", loc);
    if (loc) setSearchParams({ search: loc });
    else searchParams.delete("search");
  };

  return (
    <div className="w-full border-b-[1px] border-gray-200 border-solid p-5 flex justify-center md:gap-5 gap-2">
      <img src="/logo-alt.svg" height={40} width={40} />
      <div className="w-2/3 lg:w-1/3 min-w-[150px] relative flex">
        <input
          className="w-full pl-5 pr-14 border rounded-full text-[0.9rem] placeholder:text-gray-500 border-gray-400 h-10  outline-none"
          value={loc}
          placeholder="Search state..."
          onChange={(e) => setLoc(e.target.value)}
        />
        <div
          className="h-9 w-12 flex gap-3 rounded-r-full hover:bg-gray-100  absolute right-0.5 top-0.5 cursor-pointer"
          onClick={handleSearch}>
          <div className=" h-full border-solid border-l-[1px] border-gray-400" />
          <img src="/search2.svg" height={25} width={25} />
        </div>
      </div>
    </div>
  );
}
