"use server";

// Function to get the API keys
export const getApiKeys = async (): Promise<string[]> => {
  const apiKeys = [
    process.env.FOOTBALL_API_API_KEY_1,
    process.env.FOOTBALL_API_API_KEY_2,
    process.env.FOOTBALL_API_API_KEY_3,
    process.env.FOOTBALL_API_API_KEY_4,
    process.env.FOOTBALL_API_API_KEY_5,
    process.env.FOOTBALL_API_API_KEY_6,
    process.env.FOOTBALL_API_API_KEY_7,
    process.env.FOOTBALL_API_API_KEY_8,
    process.env.FOOTBALL_API_API_KEY_9,
    process.env.FOOTBALL_API_API_KEY_10,
    process.env.FOOTBALL_API_API_KEY_11,
    process.env.FOOTBALL_API_API_KEY_12,
  ].filter(Boolean); // Filter out any undefined keys

  return apiKeys as string[];
};
