import React, { useState } from "react";
import Main from "../components/Main.tsx";

export default function Home() {
  const [query, setQuery] = useState<string>("");

  return (
    <div className="page">
      <head>
        <title>Wykople</title>
        <link rel="stylesheet" href="../style/index.css" />
      </head>

      <Main query={query} setQuery={setQuery} />
    </div>
  );
}
