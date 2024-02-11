import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Header() {
  const [loc, setLoc] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [show, setShow] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const addToHistory = () => {
    if (history.length > 4) history.length = 4;
    setHistory([loc, ...history]);
  };

  // TODO: bug spaces are being taken
  const handleSearch = () => {
    if (loc) {
      addToHistory();
      setSearchParams({ loc });
    } else searchParams.set("", "");
    setLoc("");
  };

  return (
    <div className="w-full border-b-[1px] border-gray-200 border-solid p-5 flex justify-center md:gap-5 gap-2">
      <img src="/logo-alt.svg" height={40} width={40} />
      <div className="w-2/3 lg:w-1/3 min-w-[150px] relative flex">
        <input
          onFocus={() => setShow(true)}
          ref={inputRef}
          className="relative w-full pl-5 pr-14 border rounded-full text-[0.9rem] placeholder:text-gray-500 border-gray-400 h-10  outline-none"
          value={loc}
          placeholder="Search location..."
          onChange={(e) => setLoc(e.target.value)}
        />
        {show && history.length !== 0 && (
          <div className="absolute rounded-xl top-12 w-full border border-solid bg-white z-20 border-gray-400">
            {history.map((sug, idx) => {
              return (
                <div
                  key={idx}
                  className="p-3 my-2 hover:bg-blue-100 transition cursor-pointer">
                  {sug}
                </div>
              );
            })}
          </div>
        )}
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
