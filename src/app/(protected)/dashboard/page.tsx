"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getLeagues } from "./_components/get-leagues";
import { useEffect, useState } from "react";

const Dashboard =  () => {
  const router = useRouter();
  const [userLeagues, setUserLeagues] = useState<{ name: string }[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {

    if (!session) {
      router.push("/login");
    } else {
      // Fetch user leagues
      fetchUserLeagues();
    }
  }, [session, status]);


  const fetchUserLeagues = async () => {
    try {
      if (session) {
        const userLeaguesRes = await getLeagues(session.user);
        setUserLeagues(userLeaguesRes);
      }
    } catch (error) {
      console.error("Failed to fetch user leagues:", error);
    }
  };

  if(status === "loading") {
    return <p>Loading...</p>;
  }

  if(!session?.user) {
    
    router.push("/login");

  } else{
    return (
      <div>
        <h1>Dashboard</h1>
        <button
          className="btn btn-primary"
        >
          Get Leagues
        </button>
        <pre>
          <code>{JSON.stringify(session, null, 2)}</code>
        </pre>
        <br/>
        <p>Leagues</p>
        <ul>
          {userLeagues.length === 0 && userLeagues.map((league) => (
            <li key={league.name}>{league.name}</li>
          ))}
        </ul>
      </div>
    );
  }
};
export default Dashboard;