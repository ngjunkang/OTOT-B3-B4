import axios from "axios";

const AsianCountriesAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVERLESS_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export { AsianCountriesAxios };
