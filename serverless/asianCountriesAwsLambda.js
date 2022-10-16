const https = require("https");

const getCountries = (requestOptions) =>
  new Promise((resolve, reject) => {
    const options = { ...requestOptions, method: "GET" };
    const req = https.request(options, (res) => {
      let buffer = "";
      res.on("data", (chunk) => (buffer += chunk));
      res.on("end", () => resolve(JSON.parse(buffer)));
    });
    req.on("error", (e) => reject(e.message));
    req.end();
  });

const cleanAsianCountry = (asianCountry) => {
  const country = asianCountry.name.official;
  const capital = asianCountry.capital ? asianCountry.capital[0] : "";
  const currencies = [];
  for (const i in asianCountry.currencies)
    currencies.push({ code: i, ...asianCountry.currencies[i] });
  const flagUrl = asianCountry.flags.png;
  const population = asianCountry.population;
  return { country, capital, currency: currencies[0], flagUrl, population };
};

exports.handler = async (event) => {
  // GET https://restcountries.com/v3.1/all
  const options = {
    host: "restcountries.com",
    path: "/v3.1/all",
    port: 443,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const countries = await getCountries(options);
  const asianCountries = countries.filter(
    (country) => country.region === "Asia"
  );
  const cleanedAsianCountries = asianCountries.map(cleanAsianCountry);
  return cleanedAsianCountries;
};
