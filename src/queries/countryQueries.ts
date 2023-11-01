import axios from 'axios';

const baseUrl = 'https://restcountries.com/v3.1/';

export const getAllCountries = async () => {
  const config = {
    method: 'GET',
    url: baseUrl + 'all',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (err: any) {
    if (!err.response) {
      throw err;
    }
    throw err.response.data;
    console.log(err);
  }
};
// export const getCountry = async () => {
//   const config = {
//     method: 'GET',
//     url: baseUrl + 'all',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//   };
//   try {
//     // console.log(config)
//     const response = await axios(config);
//     return response.data.data;
//   } catch (err: any) {
//     if (!err.response) {
//       throw err;
//     }
//     throw err.response.data;
//     console.log(err);
//   }
// };
// export const getFilteredCountries = async ({
//   filterData,
// }: {
//   page: string;
//   limit: string;
//   filterData?: {
//     name?: string;
//     region?: 'Africa' | 'America' | 'Asia' | 'Europe' | 'Oceania';
//   };
// }) => {
//   let filter = '';
//   if (!filterData) {
//     filter = '';
//   } else {
//     for (const [key, value] of Object.entries(filterData)) {
//       if (value !== '') {
//         filter += `&${key}=${value}`;
//       }
//     }
//   }

//   const config = {
//     method: 'GET',
//     url: baseUrl + 'all',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//   };
//   try {
//     // console.log(config)
//     const response = await axios(config);
//     return response.data.data;
//   } catch (err: any) {
//     if (!err.response) {
//       throw err;
//     }
//     throw err.response.data;
//     console.log(err);
//   }
// };
