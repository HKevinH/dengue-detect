import axios from 'axios';

const API_KEY = '4d2a6d1b617b44329c8ebdc36efa4ce6';
const BASE_URL = 'https://newsapi.org/v2';

export const fetchDengueNews = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: 'dengue',
        language: 'es',
        apiKey: API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};