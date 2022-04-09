import React from "react";
import SearchIcon from "./SearchIcon.tsx";
import { redirect } from "https://deno.land/x/aleph@v0.3.0-beta.19/framework/core/mod.ts";

const Main = ({ query, setQuery }: any) => {
  const handleSearch = () => {
    if (query) {
      redirect("/search?q=" + query);
    }
  };

  return (
    <div className="main">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-center">
        <h1 className="font-medium text-5xl sm:text-6xl font-title">
          <span className="text-blue-500">wykop</span>le
        </h1>

        <div className="relative block max-w-screen px-4 sm:px-0 w-[35rem] text-gray-800">
          <div className="absolute inset-y-0 left-0 pl-8 sm:pl-4 flex items-center">
            <SearchIcon />
          </div>
          <input
            autoFocus
            type="text"
            name="query"
            value={query}
            placeholder="Szukaj..."
            className="block w-full border border-gray-300 rounded-full py-3 pl-12 hover:shadow-catche focus:shadow-around focus:ring-0 focus:border-white focus-visible:outline-none"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
        <div>
          <button
            className="text-gray-800 bg-gray-100 px-4 py-2 rounded hover:shadow-around border border-gray-300"
            onClick={handleSearch}
          >
            Szukaj
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
