// import { GetServerSideProps } from "next"

// export const getServerSideProps = (async (context) => {
//     const response = await fetch(
//             'https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=Bratislava&country_name=Slovakia',
//             {  
//                 method: 'GET',
//                 headers: {
//                     'X-RapidAPI-Key': 'd6850ca347mshb135b00f6e9f6b2p109ccejsnf924080e2e9b',
// 		            'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com'
//                 },
//             }
//     );
//     const repo = await response.json();
//     console.log(repo);
//     return { props: { repo } }
// }) satisfies GetServerSideProps<{
//     repo: any
// }>