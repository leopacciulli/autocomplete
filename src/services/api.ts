import { COUNTRIES } from './data';
import { Country } from './types';

const searchCountry = (query: string): Country[] =>
  COUNTRIES.filter(item =>
    item.name.toUpperCase().includes(query.toUpperCase()),
  );

// The hack here was I added a timeout to look like an asynchronous call
export const searchApiV2 = async (query: string): Promise<Country[]> =>
  await new Promise(resolve => {
    setTimeout(() => {
      resolve(searchCountry(query));
    }, 300);
  });
