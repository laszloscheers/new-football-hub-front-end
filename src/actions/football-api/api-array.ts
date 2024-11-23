"use server";

// Function to get the API keys
export const getApiKeys = async (): Promise<string[]> => {
  const apiKeys = [
    process.env.REACT_APP_API_KEY_1,
    process.env.REACT_APP_API_KEY_2,
    process.env.REACT_APP_API_KEY_3,
    process.env.REACT_APP_API_KEY_4,
    process.env.REACT_APP_API_KEY_5,
    process.env.REACT_APP_API_KEY_6,
    process.env.REACT_APP_API_KEY_7,
    process.env.REACT_APP_API_KEY_8,
    process.env.REACT_APP_API_KEY_9,
    process.env.REACT_APP_API_KEY_10,
    process.env.REACT_APP_API_KEY_11,
    process.env.REACT_APP_API_KEY_12,
  ].filter(Boolean); // Filter out any undefined keys

  return apiKeys as string[];
};
