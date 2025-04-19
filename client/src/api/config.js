const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://mood-analyzer-mu.vercel.app'
  : 'http://localhost:5001';

export default API_URL; 