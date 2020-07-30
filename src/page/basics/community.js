import { faTools } from "@fortawesome/free-solid-svg-icons/faTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Community() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <FontAwesomeIcon icon={faTools} size="2x" color="yellow" style={{ paddingRight: "10px" }} />
        {"  "} Page under construction
      </div>

      <div className="subSection detailBox" id={2894038}>
        <div className="subSectionTitle">Basics - Streamers </div>
        <div className="subSectionDesc">
          Watching the most popular streamers is also a good way to earn resources!
          <br />
          In fact the BetaDwarf provides them giveaway packages to be given away, and the more
          viewer they have, the bigger the packages will be, so be sure you don't miss your chance
          in their raffle (especially if you are a new player)!
          <br />
          <br />
          While viewing a stream on twitch, there are several commands that you can use to interact
          with the game by changing your puff style or by throwing stuff in the arena. All the
          commands available can be found here:{" "}
          <a
            className="bb_link"
            href="https://steamcommunity.com/linkfilter/?url=http://minionmastersthegame.com/streamerboost/"
            target="_blank"
            rel="noreferrer"
          >
            http://minionmastersthegame.com/streamerboost/
          </a>
          <br />
          <br />
          Also by watching the streamers, you will receive drops when they win! Drops grant you 50
          gold (and eventually a key of the tri-team event).
          <br />
          The drops can be collected on login. <div style={{ clear: "both" }} />
        </div>
      </div>

      <div>
        <div style={{ clear: "both" }} />
        <div className="subSection detailBox" id={2837185}>
          <div className="subSectionTitle">Basics - Interaction with Others </div>
          <div className="subSectionDesc">
            One last basic concept that you should know is that while you can quit the game at any
            time, and you can even choose to do so during a 1 vs 1 game to "resign", you should{" "}
            <b>NEVER</b> do that on a team battle game, no matter what.
            <br />
            Always remember that in a team battle everything can happen, and sometimes even if it
            looks like you are losing, your teammate could have an ace in the sleeve that will save
            the game. Personally I've won games with less than 20hp left, because sometimes it's
            just a matter of luck too!
            <br />
            Remember that leaving a team battle will prevent you from playing another game for
            several minutes, while leaving at the beginning of a team battle is a bannable offense.
            <br />
            <br />
            Also <b>NEVER</b> queue for a team match and go away from the computer, that's why it
            says "ESTIMATED" time, because you could get it in 1 second or more than the timer says,
            and you'll might end up ruining someone game.
            <br />
            <br />
            Last info I want to say about this, is how to report a player. While you can report
            people in chat by clicking their name and press "Report", if you find cheaters (rare but
            it could happen), people who go away during a team match, or people who quit at the
            start of a team match, you can report them by sending an email to{" "}
            <u>
              <a href="mailto:support@betadwarf.com">support@betadwarf.com</a>
            </u>{" "}
            explaining what happen and by attaching the replay(s) to the message.
            <br />
            <br />
            To interact more with the community you can also use the official{" "}
            <a
              className="bb_link"
              href="https://steamcommunity.com/linkfilter/?url=https://discordapp.com/invite/minionmasters"
              target="_blank"
              rel="noreferrer"
            >
              Minion Masters discord channel
            </a>
            <span className="bb_link_host">[discordapp.com]</span>. The discord channel provides the
            same service of the steam forum, but it works more like a real-time chat than a forum.{" "}
            <div style={{ clear: "both" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
