import React, { useState } from "react";
import { useRouter } from "https://deno.land/x/aleph@v0.3.0-beta.19/framework/react/mod.ts";
import Results from "../components/Results.tsx";

export default function Search() {
  const { query } = useRouter();
  const [search, setSearch] = useState<any>(query.get("q"));

  return (
    <div className="page">
      <head>
        <title>{search ? `${search} - ` : ""}Wykople</title>
        <link rel="stylesheet" href="../style/index.css" />
      </head>

      <Results search={search} setSearch={setSearch} query={query} />
    </div>
  );
}
