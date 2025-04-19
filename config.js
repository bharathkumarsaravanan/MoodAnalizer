// Create this file if it doesn't exist
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://mood-analyzer-mu.vercel.app'
  : 'http://localhost:5001';

export default API_URL;