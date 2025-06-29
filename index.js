import express from "express";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { text } from "stream/consumers";
import { title } from "process";

const app = express();
const port = 3000;
const year = new Date();
const currYear = year.getFullYear();

app.use(express.static("public"));

function convertTOJSON(req, res, next) {
  const results = [];
  const csvPath = path.join(process.cwd(), "data", "neurologica_articles.csv");

  fs.createReadStream(csvPath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      req.data = results;
      next();
    })
    .on("error", (err) => {
      console.error(err);
      res.status(500).send("Failed to load CSV");
    });
}

app.use(convertTOJSON);

app.get("/", (req, res) => {
  const titles = req.data.map((row) => row.title).slice(0, 55);
  const dates = req.data.map((row) => row.publication_date).slice(0, 55);
  const datesFormatted = dates.map((str) => {
    const [month, day, year] = str.split(" ");
    return `${year}.${monthMap[month]}.${day}`;
  });
  const texts = req.data.map((row) => row.text).slice(0, 55);
  const authors = req.data.map((row) => row.author).slice(0, 55);
  const categories = req.data.map((row) => row.categories).slice(0, 55);
  const filteredCategories = req.data
    .flatMap((row) => row.categories.split(";").map((cat) => cat.trim()))
    .slice(0, 55);
  const uniqueCategories = [...new Set(filteredCategories)];
  const fullDates = req.data.map((row) => row.publication_date);
  const yearFormat = fullDates.map((str) => {
    const [month, day, year] = str.split(" ");
    return `${year}`;
  });
  const uniqueDates = [...new Set(yearFormat)];
  const url = req.data.map((row) => row.url).slice(0, 55);
  const filteredUrl = url.map((url) => {
    const temp = url
      .split("https://theness.com/neurologicablog/")
      .map((url) => url.trim())
      .filter((url) => url !== "");
    return `${temp}`;
  });
  const id = filteredUrl.map((id) => {
    const temp = id.slice(0, -1);
    return `${temp}`;
  });

  res.render("index.ejs", {
    id,
    titles,
    dates: datesFormatted,
    summary: texts,
    author: authors,
    categories,
    uniqueCategories,
    uniqueDates,
    currYear,
  });
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs", { currYear });
});

app.get("/article/:id", (req, res) => {
  const index = "https://theness.com/neurologicablog/" + req.params.id + "/";
  const article = req.data.find((item) => item.url === index);
  const sentences = article.text.match(/[^\.!\?]+[\.!\?]+/g);
  const paragraphs = [];

  for (let i = 0; i < sentences.length; i += 10) {
    const group = sentences
      .slice(i, i + 10)
      .join("")
      .trim();
    paragraphs.push(`<p>${group}</p>`);
  }

  res.render("article.ejs", {
    currYear,
    text: paragraphs.join(""),
    minRead: paragraphs.length,
    article,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

const monthMap = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};
