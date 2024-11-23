"use server";

import { apiKeys } from "@/actions/football-api/api-array";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { league } = req.query;

  for (const apiKey of apiKeys) {
    try {
      const response = await fetch(
        `https://api.football-data.org/v4/competitions/${league}/standings`,
        {
          method: "GET",
          headers: {
            "X-Auth-Token": apiKey || "",
            "access-control-allow-origin":
              process.env.NEXT_PUBLIC_APP_URL + "/*" || "",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return res.status(200).json(data);
      } else {
        console.error(`Failed to fetch with API key: ${apiKey}`);
      }
    } catch (error) {
      console.error(`Error fetching with API key: ${apiKey}`, error);
    }
  }

  return res.status(500).json({ error: "All API keys failed" });
}
