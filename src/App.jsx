import axios from "axios";
import { useEffect, useRef, useState } from "react";

function App() {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [listShow, setListShow] = useState(false);
  const cache = useRef({});

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchApi(searchText);
    }, 400);
    return () => clearTimeout(debounce);
  }, [searchText]);

  const fetchApi = async (query) => {
    if (cache.current[query]) {
      setSearchResult(cache.current[query]);
      return;
    }

    const res = await axios.get(
      `https://www.google.com/complete/search?client=firefox&q=${query}`,
    );

    const data = await res.data[1];
    console.log("data", data);
    cache.current[query] = data;
    setSearchResult(data);
  };

  return (
    <main className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setListShow(true)}
          onBlur={() => setListShow(false)}
          className="w-96 rounded-full border border-gray-300 p-3 shadow-sm transition duration-300 focus:outline-none"
        />
        {searchResult.length > 0 && listShow && (
          <ul className="mt-2 max-h-60 w-96 overflow-y-auto rounded-lg rounded-b-lg border border-gray-300 bg-white shadow-sm">
            {searchResult.map((result, index) => (
              <li key={index} className="cursor-pointer p-3 hover:bg-gray-100">
                {result}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export default App;
