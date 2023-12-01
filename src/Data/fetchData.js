import Axios from 'axios';
const axios = Axios.create({
  baseURL: 'https://api.apilayer.com/fixer',
});

const myapi = "GLKKFCFOxdQeFT0MaHk7hGXHA9LnzMo6"; // MY API KEY

export const fetchRates = async (currencyOne) => {
  const { data } = await axios.get(
    `/latest?base=${currencyOne}&apikey=${myapi}`
  );
  return data;
};

export const fetchSymbols = async () => {
  const { data } = await axios.get(
    `/symbols?apikey=${myapi}`
  );
  return data;
};
