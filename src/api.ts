import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.quotable.io',
});

export const fetchTypingText = async (mode: 'short' | 'medium' | 'long'): Promise<string> => {
  let minLength = 150;
  let maxLength = 0; // No maximum by default (Long)

  if (mode === 'short') {
    maxLength = 50;
    minLength = 0;
  } else if (mode === 'medium') {
    minLength = 50;
    maxLength = 150;
  } else if (mode === 'long') {
    minLength = 150;
  }

  const response = await API.get<{ content: string }>('/random', {
    params: { minLength, maxLength },
  });

  return response.data.content;
};

export default API;
