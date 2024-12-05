"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { League } from "@/app/_components/_main-content/_matches/_components/_finished-matches/_components/FinishedMatchesClient";
import DashboardLeaguePage from "./DashboardLeaguePage";

export default function UserDashboard() {
  const router = useRouter();
  const [userLeagues, setUserLeagues] = useState<League[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return; // Wait for session to be loaded
    if (!session) {
      router.push("/login");
      return;
    }

    fetch('/api/get-leagues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: session.user.token }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to fetch user leagues');
          throw new Error('Failed to fetch user leagues');
        }
      })
      .then((leagues) => {
        setUserLeagues(leagues);
      })
      .catch((error) => {
        console.error("Error fetching user leagues:", error);
      });
  }, [session, status]);


  return (
    <>
      {userLeagues.map((league: League) => (
        <DashboardLeaguePage key={league.name} params={{ league: league.name }} />
      ))}
    </>
  );
}

