import css from "page/tournaments/tournaments.module.scss";
import React from "react";
import { CommunityOfficials } from "page/tournaments/community-officials";

export function Community() {
  return (
    <div>
      <div>Missing links? You can inform me and I will add them!</div>

      <fieldset>
        <legend>Streams</legend>

        <ul>
          <li>
            <a href="https://www.twitch.tv/directory/game/Minion%20Masters">More Twitch channels</a>
          </li>
          <li>
            <a href="https://www.twitch.tv/badasafish80">badasafish80</a>
          </li>
        </ul>
      </fieldset>

      <fieldset>
        <legend>Videos</legend>

        <ul>
          <li>
            <a href="https://www.youtube.com/results?search_query=minionmasters">
              More Youtube videos
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/channel/UC9SN3rP2tco0NFzYmB-DcQw">Last Elf</a>
          </li>
        </ul>
      </fieldset>

      <fieldset>
        <legend>Upcoming Tournaments</legend>
        <div className={css.upcomingTournaments}>
          Can all be found here or you can participate:
          <h4>
            <a href="https://www.toornament.com/en_GB/tournaments/community.js?_locale=en_GB&q%5Bdiscipline%5D=minion_masters&q%5Bplatform%5D=&q%5Bsearch%5D=&q%5Btype%5D=upcoming">
              www.toornament.com
            </a>
          </h4>
        </div>
      </fieldset>

      <fieldset>
        <legend>Past Tournaments</legend>
        You can watch the games here:
        <ul>
          <li>
            <a href="https://www.youtube.com/c/Badasafish80/videos">BadasaFish80</a>
          </li>
          <li>
            <a href="https://www.youtube.com/c/KingPuffCup/videos">KingPuffCup</a>
          </li>
          <li>
            <a href="https://www.youtube.com/channel/UC9SN3rP2tco0NFzYmB-DcQw">Last Elf</a>
          </li>

          <li>
            <a href="https://www.youtube.com/watch?v=_QtPa3Rlbk4">GGTour (Several linked)</a>
          </li>
        </ul>
      </fieldset>


      <fieldset>
        <legend>Card Tierlist</legend>
        <h2>1on1 created by BadAsFish80 community.</h2>
        <img src="https://tiermaker.com/images/tier-lists-2021/1006397/minion-masters-1v1-no-wildcards-1006397-1621371870.png" />
        <h2>
          <a href="https://tiermaker.com/create/minion-masters-1v1-no-wildcards-1006397">Here you can create your own ranking of it</a>
        </h2>
      </fieldset>

      <CommunityOfficials />
    </div>
  );
}
