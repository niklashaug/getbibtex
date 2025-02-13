import urlMetadata from "url-metadata";
import { type EntryData } from "./types";
import { createCiteKey } from "./create-citekey";
import { getCurrentDateString } from "@/utils/date-format";
import { createAccessedNote, encodeCharactersInBibTex } from "@/utils/bibtex";
import puppeteer from "puppeteer";
import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import * as path from "node:path";

const streamPipeline = promisify(pipeline);

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

  const response = await page.goto(url, { waitUntil: "networkidle2" });

  const contentType = response?.headers()["content-type"];
  const isPdf = contentType?.includes("application/pdf");

  const parsedUrl = new URL(url);
  const pathname = parsedUrl.pathname;
  const fileName = path.basename(pathname);

  const fileNameWithoutExtension = fileName.replace(".pdf", "");

  const outputPath = `./pdfs/${new Date().getTime()}-${isPdf ? fileNameWithoutExtension : title}.pdf`;

  if (isPdf) {
    await downloadFile(url, outputPath);
  } else {
    await page.pdf({
      path: outputPath,
      format: "a4",
    });
  }

  await browser.close();
};

async function downloadFile(url: string, outputPath: string) {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(
      `Issue when trying to download file: ${response.statusText}`,
    );

  const fileStream = fs.createWriteStream(outputPath);
  await streamPipeline(response.body, fileStream);
}

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
\tnote = {${createAccessedNote()},
}`;

  return bibtex;
}
