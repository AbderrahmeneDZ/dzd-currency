const express = require("express");
const app = express();
const https = require("https");

app.use(express.static("public"));

app.get("/bank-of-algeria", async (req, res) => {
  https.get("https://www.bank-of-algeria.dz/html/marcheint2.htm", function (
    response
  ) {
    let html = "";
    response.on("data", function (data) {
      html += data.toString();
    });

    response.on("error", function (e) {
      return res.json(res.statusCode, JSON.parse(e.toString()));
    });

    response.on("end", function (end) {
      let currencies = html.substring(14909, 14909 + 104);
      let currency_rates = {
        USD: currencies.substr(6, 17),
        EUR: currencies.substring(33, 33 + 17),
        GBP: currencies.substring(59, 59 + 17),
      };
      Object.keys(currency_rates).forEach((key) => {
        const sell_buy = currency_rates[key].split("/");
        currency_rates[key] = {
          SELL: +sell_buy[0],
          BUY: +sell_buy[1],
        };
      });
      return res.send({
        DZD: currency_rates,
      });
    });
  });
});

app.get("/cpa", (req, res) => {
  https.get("https://www.cpa-bank.dz/index.php/fr/", function (response) {
    let html = "";
    response.on("data", function (data) {
      html += data.toString();
    });

    response.on("error", function (e) {
      return res.json(res.statusCode, JSON.parse(e.toString()));
    });

    response.on("end", function (end) {
      let DZD = {
        USD: {
          BUY: +html.substring(67874, 67880).replace(",", "."),
          SELL: +html.substring(67918, 67924).replace(",", "."),
        },
        EUR: {
          BUY: +html.substring(68109, 68115).replace(",", "."),
          SELL: +html.substring(68153, 68159).replace(",", "."),
        },
        GBP: {
          BUY: +html.substring(68344, 68350).replace(",", "."),
          SELL: +html.substring(68388, 68394).replace(",", "."),
        },
      };
      res.json({
        DZD,
      });
    });
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`application started on port : ${port}`);
});
