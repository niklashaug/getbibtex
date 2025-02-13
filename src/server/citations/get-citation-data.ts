import urlMetadata from "url-metadata";
import { type EntryData } from "./types";
import { createCiteKey } from "./create-citekey";
import { getCurrentDateString } from "@/utils/date-format";
import { encodeCharactersInBibTex } from "@/utils/bibtex-encode-characters";
import puppeteer from "puppeteer";

export const getCitation = async (url: string) => {
  let metadata = await urlMetadata(url);
  // When failed to fetch metadata try again with `www` subdomain
  if (!metadata.title) {
    url = addSubdomain(url);
    metadata = await urlMetadata(url);
  }
  const domain = domainFromUrl(url);
  const entryData: EntryData = {
    title: metadata.title,
    author: metadata.author,
    url,
    website: domain,
  };

  void downloadPdf(url, metadata.title);

  const bibtex: string = bibtexFromEntryData(entryData);

  return { bibtex, entryData };
};

const downloadPdf = async (url: string, title: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });

  await page.pdf({
    path: `./pdfs/${title}.pdf`,
    format: "a4",
  });

  await browser.close();
};

export const serializeUrl = (url: string): string => {
  const serializedUrl = url.trim();
  return addProtocol(serializedUrl);
};

function addProtocol(url: string): string {
  // Check if the URL starts with either "http://" or "https://"
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  } else {
    // If it doesn't start with either, add "https://"
    return "https://" + url;
  }
}

function addSubdomain(url: string): string {
  if (!url.includes("www")) {
    if (url.startsWith("https://")) {
      return url.replace("https://", "https://www.");
    } else if (url.startsWith("http://")) {
      return url.replace("http://", "http://www.");
    }
  }

  return url;
}

function domainFromUrl(url: string): string {
  // based on regular expression https://regex101.com/r/MOIFTy/3
  const domainRegex = /^(?:https?:)?(?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n]+)/;
  const match = url.match(domainRegex);
  let domain = "";
  if (match != null) {
    domain = match.at(1) ?? "";
  }
  return domain;
}

function bibtexFromEntryData(entryData: EntryData): string {
  // TODO: check if there are no invalid characters for bibtex
  const currentDate = getCurrentDateString();
  const title = encodeCharactersInBibTex(
    `${entryData.title ? entryData.title + " --- " : ""}${entryData.website}`,
  );
  const bibtex = `@misc{${createCiteKey(entryData)},
\tauthor = {${entryData.author}},
\ttitle = {${title}},
\thowpublished = {\\url{${entryData.url}}},
\tyear = {},
\tnote = {[Accessed ${currentDate}]},
}`;

  return bibtex;
}
