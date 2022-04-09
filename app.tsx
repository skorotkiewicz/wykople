import React, { FC } from "react";

export default function App({
  Page,
  pageProps,
}: {
  Page: FC;
  pageProps: Record<string, unknown>;
}) {
  return (
    <main>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <meta name="robots" content="follow, index" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="Content-Language" content="pl" />
        <meta name="description" content="Szybka wyszukiwarka dla Wykop.pl" />
        <meta name="keywords" content="wyszukiwarka, wykop, wykop.pl" />
        <link rel="icon" href="/favicon.svg" />
      </head>
      <Page {...pageProps} />
    </main>
  );
}
