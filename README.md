
# Ramble

Ramble is your personal passport to the planet's price tags. It's not just a web app; it's a whisperer for your wallet. Real-time data, tailor-made recommendations, and a community of kindred travelers make Ramble your go-to guide for worldly adventures without the financial fuss.
## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

<!--- ## Commits titles

If you are wondering WTF are these commits titles?!
- I am creating commits titles based on what i am listening to, mostly music, because why not.

-->

## Getting Started

1. First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

## Run Locally

Clone the project

```bash
  git clone https://github.com/Adam014/Ramble.git
```

Go to the project directory

```bash
  cd ramble
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Background_color | ![#00000](https://via.placeholder.com/10/0000?text=+) #000000 |
| Button_color | ![#F13E51](https://via.placeholder.com/10/F13E51?text=+) #F13E51 |
| Hover_color | ![#E08C9C](https://via.placeholder.com/10/E08C9C?text=+) #E08C9C |
| Tag_color | ![#001a64](https://via.placeholder.com/10/001a64?text=+) #001a64 |


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

NEXT_PUBLIC_RAPIDAPID_KEY = your_RAPIDAPI_key 

NEXT_PUBLIC_SUPABASE_ANON_KEY = your_SUPABASE_key

NEXT_PUBLIC_SUPABASE_APP_URL = your_SUPABASE_url


## API Reference

#### Get the details of the city

```http
  GET /map/${country}/${capital}
```

## Summary
Defines three asynchronous functions to fetch city data from a Supabase database. The functions handle fetching data for a specific page number, a specific city, and all cities within a specific country.

## Example Usage
```js
const pageNumber = 1;
const citiesData = await fetchCitiesData(pageNumber);
console.log(citiesData);

const country = 'USA';
const city = 'New York';
const cityData = await fetchCityData(country, city);
console.log(cityData);

const citiesByCountry = await fetchCitiesByCountry(country);
console.log(citiesByCountry);
```

## Code Analysis
1. Inputs
- pageNumber: A number representing the page of data to fetch.
- country: A string representing the country name.
- city: A string representing the city name.
2. Flow
- fetchCitiesData checks for existing data for a given page number and returns it sorted by rank.
_ fetchCityData fetches data for a specific city and country.
- fetchCitiesByCountry fetches all cities data for a specific country.
3. Outputs
- fetchCitiesData: Returns sorted city data for the given page number or null if an error occurs.
- fetchCityData: Returns data for the specified city or null if not found or an error occurs.
- fetchCitiesByCountry: Returns an array of cities data for the specified country or an empty array if not found or an error occurs.

## Authors

- [@kindast](https://www.github.com/kindast) - Fullstack Developer


## Tech Stack

**Client:** Next.js (both Typescript and Javascript for the map), TailwindCSS, Jest

**Database:** Supabase 

## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/adam-stádník-271280218/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/kindastcs)


## Contributing

Contributions are always welcome!


## Support

For support, email adam.stadnik@seznam.cz or contact me via the web!


## Feedback

If you have any feedback, please reach out to me at adam.stadnik@seznam.cz
