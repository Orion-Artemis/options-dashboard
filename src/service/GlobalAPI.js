import axios from 'axios';

// Base URL for the API
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

// Fetch options data for a specific ticker
export const fetchOptionsData = async (ticker) => {
  try {
    const response = await apiClient.get(`${ticker}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching options data:', error);
    throw error;
  }
};

// Evaluate if the option is good
export const evaluateOption = async (optionData) => {
  try {
    const response = await apiClient.post('/evaluate/', optionData);
    return response.data;
  } catch (error) {
    console.error('Error evaluating option:', error);
    throw error;
  }
};

export default {
  fetchOptionsData,
  evaluateOption,
};
