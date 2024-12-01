import LeaguePage from "./[league]/page";

const LeaguesPage = () => {

  return (
    <section className=" px-4">
      <LeaguePage params={{
        league: "Premier League"
      }} />

    </section>
  )
}

export default LeaguesPage