import API_URL from './config';

export const loginWithSpotify = () => {
  window.location.href = `${API_URL}/users/auth/spotify`;
};

export const fetchUserDetails = async (userId) => {
  const response = await fetch(`${API_URL}/users/${userId}/details`);
  return response.json();
};

// Add other API calls similarly 