
# Nomadify

Nomadify is your personal passport to the planet's price tags. It's not just a web app; it's a whisperer for your wallet. Real-time data, tailor-made recommendations, and a community of kindred travelers make Nomadify your go-to guide for worldly adventures without the financial fuss.
## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)



## License

[MIT](https://choosealicense.com/licenses/mit/)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Run Locally

Clone the project

```bash
  git clone https://github.com/Adam014/Nomadify.git
```

Go to the project directory

```bash
  cd nomadify
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Demo

https://nomadify-blond.vercel.app

## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Background_color | ![#00000](https://via.placeholder.com/10/0000?text=+) #000000 |
| Button_color | ![#F13E51](https://via.placeholder.com/10/F13E51?text=+) #F13E51 |
| Hover_color | ![#E08C9C](https://via.placeholder.com/10/E08C9C?text=+) #E08C9C |


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

NEXT_PUBLIC_RAPIDAPID_KEY = your_RAPIDAPI_key 

NEXT_PUBLIC_SUPABASE_ANON_KEY = your_SUPABASE_key

NEXT_PUBLIC_SUPABASE_APP_URL = your_SUPABASE_url


## API Reference

#### Get the Cost to Live of the capital city

```http
  GET /map/${country}/${capital}
```

## Summary
The `fetchData` function is responsible for fetching data from the Supabase database. It first checks if the data exists in Supabase by querying the `CountryAndCapitalCollection` table. If the data is found, it is returned. If the data is not found, the function calls the `fetchCostOfLiving` function to fetch the data from an external API. The fetched data is then saved to Supabase and returned.

## Example Usage
```javascript
const data = await fetchData('USA', 'Washington');
console.log(data);
// Output: The fetched data from Supabase or the external API
```

## Code Analysis
### Inputs
- `decodedCountry` (string): The decoded country name.
- `decodedCapital` (string): The decoded capital name.
___
### Flow
1. The function queries the `CountryAndCapitalCollection` table in Supabase to check if the data exists for the given country and capital.
2. If the data is found, it is returned.
3. If the data is not found, the function calls the `fetchCostOfLiving` function to fetch the data from an external API.
4. The fetched data is then saved to Supabase using the `upsert` method.
5. If the data is successfully saved, it is returned.
6. If any errors occur during the process, appropriate error messages are thrown.
___
### Outputs
- The fetched data from Supabase or the external API.
___


It also works, when u type:

#### Get the Cost to Live of the city you enter

```http
  GET /map/${country}/${another_city_you_can_think_of}
```


## Authors

- [@kindast](https://www.github.com/kindast) - Frontend Developer 


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

