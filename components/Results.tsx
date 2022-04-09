import React, { useState, useEffect } from "react";
import SearchIcon from "./SearchIcon.tsx";
import ChevronRightIcon from "./ChevronRightIcon.tsx";
import ChevronLeftIcon from "./ChevronLeftIcon.tsx";
import XIcon from "./XIcon.tsx";
import { redirect } from "https://deno.land/x/aleph@v0.3.0-beta.19/framework/core/mod.ts";

const Results = ({ search, setSearch, query }: any) => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [currentPage, setCurrentPage] = useState(query.get("page") || 0);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState("");
  const hasPrev = currentPage >= 1 ? true : false;
  const hasNext = true;
  const error: {} | null | undefined = [];
  let ikey = 0;

  useEffect(() => {
    handleSearch();

    window.addEventListener(
      "scroll",
      () => {
        setIsAtTop(window.scrollY === 0);
      },
      false
    );

    return () => {
      window.removeEventListener(
        "scroll",
        () => {
          setIsAtTop(window.scrollY === 0);
        },
        false
      );
    };
  }, [currentPage]);

  const handleSearch = () => {
    if (search) {
      setIsLoading(true);

      redirect(
        `/search?q=${search}${
          currentPage > 0 ? `&page=${Number(currentPage)}` : ""
        }`
      );

      fetch(
        `/api/search?q=${search}${
          currentPage > 0 ? `&page=${Number(currentPage)}` : ""
        }`
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setResults(res.results);
          setStats(res.meta[0]);
          setIsLoading(false);
        })
        .catch((e) => console.error(e));
    }
  };

  return (
    <div className="main">
      <div
        className={`flex flex-col sm:flex-row items-center py-4 sm:py-6 border border-white gap-2 sm:gap-0 fixed bg-white top-0 w-full text-gray-800 ${
          isAtTop ? "border-b-2 border-gray-100" : "shadow-md"
        }`}
      >
        <a href="/" className="font-medium text-2xl font-title mx-2 sm:mx-8">
          <span className="text-blue-500">wykop</span>le
        </a>

        <div className="relative block max-w-screen px-4 sm:px-0 w-[35rem]">
          <input
            autoFocus
            type="text"
            name="query"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full border border-gray-300 rounded-full py-2 sm:py-3 pl-8 hover:shadow-around focus:shadow-around focus:ring-0 focus:border-0 focus-visible:outline-none"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <div className="absolute inset-y-0 right-0 pr-8 sm:pr-4 items-center flex">
            <span
              onClick={() => {
                setSearch("");
              }}
            >
              <XIcon />
            </span>

            <div className="h-3/5 w-0.5 bg-gray-100 mx-2"></div>
            <span
              onClick={() => {
                handleSearch();
                setCurrentPage(0);
              }}
            >
              <SearchIcon classes="h-5 w-5 text-light-blue cursor-pointer" />
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-screen sm:max-w-2xl px-4 sm:px-0 sm:ml-48 mt-36 sm:mt-32 text-gray-800">
        {!isLoading ? (
          <>
            <div className="my-4 text-sm">{stats}</div>

            {results.length > 0 ? (
              <div className="flex flex-col gap-8">
                {results.map(
                  (res: { link: string; title: string; snippet: string }) => (
                    <div key={(ikey = ikey + 1)}>
                      {/* <h3> */}
                      <a href={res.link} className="text-link-blue text-xl">
                        {res.title
                          .replace(" - Wykop.pl", "")
                          .replace("w Wykop.pl", "")
                          .replace("- Wykop", "")}
                      </a>
                      {/* </h3> */}
                      <p>{res.snippet}</p>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="my-4 text-sm">
                {isLoading ? (
                  <span>Ładuje...</span>
                ) : (
                  <span>Brak wyników :(</span>
                )}
              </div>
            )}
          </>
        ) : (
          <span>Ładuje...</span>
        )}
        {error && <div className="my-4 text-sm">{error}</div>}
      </div>

      {/* Footer */}

      {!isLoading && (
        <div className="max-w-screen sm:max-w-2xl px-4 sm:px-0 sm:ml-48 mt-20 mb-36 text-gray-800">
          <h1 className="font-medium text-3xl font-title mx-8 flex w-max mx-auto">
            {/* <!-- Prev --> */}
            {hasPrev && (
              <div
                className="inline px-0 mx-0 flex flex-col w-max items-center mx-2 cursor-pointer"
                onClick={() => {
                  setCurrentPage((i: number) => Number(i) - 1);
                  redirect(
                    `/search?q=${search}&page=${Number(currentPage) - 1}`
                  );
                }}
              >
                <div className="flex items-center">
                  &nbsp;
                  <ChevronLeftIcon />
                  &nbsp;
                </div>
                <div className="text-sm text-light-blue font-sans">
                  Poprzednie
                </div>
              </div>
            )}
            <span className="text-blue-500">wyk</span>
            {((currentPage) => {
              let p = 0;
              let rows = [];
              for (let i = 0; i < Math.min(currentPage, 9); i++) {
                rows.push("o");
                p = i;
              }
              return (
                <>
                  {rows.map((o, i) => (
                    <div
                      key={`o${i}`}
                      className={`inline px-0 mx-0 flex flex-col w-max items-center ${
                        currentPage === p + currentPage
                          ? ""
                          : "cursor-pointer text-black-500"
                      }`}
                      onClick={() => {
                        setCurrentPage(i + 1);
                        redirect(`/search?q=${search}&page=${i + 1}`);
                      }}
                    >
                      {o}
                    </div>
                  ))}
                </>
              );
            })(currentPage)}
            {/*  */}
            <span className="text-blue-500">op</span>le
            {/* <!-- Next --> */}
            {hasNext && (
              <div
                className="inline px-0 mx-0 flex flex-col w-max items-center mx-2 cursor-pointer"
                onClick={() => {
                  setCurrentPage((i: number) => Number(i) + 1);
                  redirect(
                    `/search?q=${search}&page=${Number(currentPage) + 1}`
                  );
                }}
              >
                <div className="flex items-center">
                  &nbsp;
                  <ChevronRightIcon />
                  &nbsp;
                </div>
                <div className="text-sm text-light-blue font-sans">
                  Następne
                </div>
              </div>
            )}
          </h1>
        </div>
      )}
      <div className="h-36" />
    </div>
  );
};

export default Results;
