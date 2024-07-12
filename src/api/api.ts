import axios from 'axios';

const API_KEY = 'HG9aTOmtGBry4YtaddJMiOIW_BQRD2Kv8Luvt536hcs';
axios.defaults.baseURL = `https://api.unsplash.com`;

const fetchImagesFromApi = async <T>(
  textInput: string = '',
  page: number,
): Promise<T> => {
  const params = new URLSearchParams({
    client_id: API_KEY,
    query: textInput,
    page: page.toString(),
    per_page: '12',
    orientation: 'landscape',
  });
  const { data } = await axios.get<T>(`/search/photos?${params}`);

  return data;
};
export default fetchImagesFromApi;
