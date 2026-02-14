import { Hero } from "../components/Hero";
import TournamentHub  from "../components/TournamentHub";
import {TeamRoster} from "../components/TeamRoster";
import { PlayerSpotlight } from "../components/PlayerSpotlight";
import StreamsHighlights from "../components/StreamsHighlights";
import { Sponsors } from "../components/Sponsors";
import { AboutUs } from "../components/AboutUs";
// import {Careers} from "../components/Careers";
import { JoinSection } from "../components/JoinSection";

const Home = () => {
  return (
    <>
      <div className="relative">
        <Hero />
        <TournamentHub />
        <TeamRoster />
        <PlayerSpotlight />
        <StreamsHighlights />
        <Sponsors />
        <AboutUs />
        {/* <Careers /> */}
        <JoinSection />
      </div>
    </>
  );
};

export default Home;
