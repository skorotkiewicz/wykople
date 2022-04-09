import type { APIHandler } from "aleph/types.d.ts";
import { cheerio } from "https://deno.land/x/cheerio@1.0.4/mod.ts";
import axiod from "https://deno.land/x/axiod@0.24/mod.ts";

export const handler: APIHandler = async ({ router, response }) => {
  const params = router.query;
  const query = new URLSearchParams(params).get("q");
  const page = new URLSearchParams(params).get("page");
  let template_url;

  if (page && Number(page) > 0) {
    template_url = `https://www.google.com/search?hl=pl&q=site:wykop.pl/ ${query}&start=${
      Number(page) * 10
    }`;
  } else {
    template_url = `https://www.google.com/search?hl=pl&q=site:wykop.pl/ ${query}`;
  }

  const result = await getResults(template_url);
  // const result = await getResults(encodeURI(template_url));
  //   console.log(result);

  response.json(result);
};

const getResults = (template_url: string) => {
  // return {
  //   results: [
  //     {
  //       link: "https://www.wykop.pl/tag/ddd/",
  //       title: "najlepsze znaleziska i wpisy o #ddd w Wykop.pl",
  //       snippet:
  //         "@gniX79: @gniX79: Społeczeństwo powinno, rząd i sądy, jeżeli rodzice braliby odpowiedzialność to może inni zastanowiliby się czy „posiadanie” dziecka to może ...",
  //     },
  //     {
  //       link: "https://www.wykop.pl/tag/ddd/wszystkie/",
  //       title: "znaleziska i wpisy o #ddd w Wykop.pl",
  //       snippet:
  //         "Dawno nic nie pisałem, co nie znaczy, że nic się nie działo. Szczególnie w aspekcie mojej psychoterapii. Działo się, zwłaszcza na ostatnich sesjach. No i dobrze ...",
  //     },
  //     {
  //       link: "https://www.wykop.pl/tag/ddd/wszystkie/next/entry-57485917/",
  //       title: "znaleziska i wpisy o #ddd w Wykop.pl - od wpisu 57485917",
  //       snippet:
  //         "Zdecydowałem się zamieścić wpisy na temat syndromu DDD - Dorosłe Dziecko z Rodziny Dysfunkcyjnej. Robię to ponieważ w Polsce jest mnóstwo ludzi z tym ...",
  //     },
  //     {
  //       link: "https://www.wykop.pl/tag/ddd/wszystkie/next/entry-58058497/",
  //       title: "znaleziska i wpisy o #ddd w Wykop.pl - od wpisu 58058497",
  //       snippet:
  //         "@Edelner: w DDD chodzi o enkapsulacje logiki w warstwie domenowej, a ty ja próbujesz gdzieś delegować. Poza tym taka metoda jest bez sensu - ta walidacja ...",
  //     },
  //     {
  //       link: "https://www.wykop.pl/wpis/60909509/ddd-is-a-buzzword-change-my-mind-programowanie/",
  //       title: "DDD is a buzzword, change my mind #programowanie - a.....y",
  //       snippet:
  //         "7 paź 2021 — Taktyczna to building blocki potrzebne do zamodelowania dziedziny w kodzie - agregaty, encje, obiekty wartości, serwisy, polityki. O ile ...",
  //     },
  //     {
  //       link: "https://www.wykop.pl/wpis/50776511/ddd-jak-dla-mnie-magiczny-buzzword-dla-programisto/",
  //       title:
  //         "DDD. Jak dla mnie, magiczny buzzword dla... - LolsLols - Wykop.pl",
  //       snippet:
  //         "DDD opóźnia proces developmentu niesamowicie. Wszystkie te sesje stormingu, a potem powielania tego samego kodu w formie różnych encji/przelotek, wymyślania ...",
  //     },
  //     {
  //       link: "https://www.wykop.pl/paylink/10411/16701/",
  //       title: "Dzień Darmowej Dostawy",
  //       snippet:
  //         "Partnerzy PREMIUM DDD 2021 - firmy wspierające polskie sklepy:.",
  //     },
  //     {
  //       link: "https://www.wykop.pl/tag/wpisy/ddd/next/entry-15634361/",
  //       title: "najlepsze wpisy o #ddd w Wykop.pl - od wpisu 15634361",
  //       snippet:
  //         "marcobolo 6 lat 10 mies. temu · +23. Tymczasem w sklepie komputronik @lechwalesa robi opisy produktów. #heheszki #humorobrazkowy #lechwalesacontent #ddd.",
  //     },
  //     {
  //       link: "https://www.wykop.pl/multimedia-tag/ddd/",
  //       title: "Zdjęcia i filmy - tag #ddd - Wykop.pl",
  //       snippet:
  //         "Ja jebie, już było tak dobrze to znowu włącza mi się tryb autodestrukcji. Cały wczorajszy dzień melancholia i myśl o tym czy nie warto by było zakończyć już te ...",
  //     },
  //   ],
  //   meta: ["Około 85 200 wyników (0,46 s) "],
  // };

  return axiod
    .get(template_url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
      },
    })
    .then(({ data }) => {
      const $ = cheerio.load(data);

      const meta: any[] = [];

      const links: string | any[] = [];
      const titles: any[] = [];
      const snippets: any[] = [];

      const stats = $("div#slim_appbar").text();

      $(".yuRUbf > a").each((i, el) => {
        links[i] = $(el).attr("href");
      });

      $(".yuRUbf > a > h3").each((i, el) => {
        titles[i] = $(el).text();
      });

      $(".VwiC3b").each((i, el) => {
        snippets[i] = $(el).text().trim();
      });

      const result = [];
      for (let i = 0; i < links.length; i++) {
        result[i] = {
          link: links[i],
          title: titles[i],
          snippet: snippets[i],
        };
      }

      meta.push(stats);
      //   console.log(result);

      return { results: result, meta };
    });
};
