import { faTools } from "@fortawesome/free-solid-svg-icons/faTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function MainScreen() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <FontAwesomeIcon icon={faTools} size="2x" color="yellow" style={{ paddingRight: "10px" }} />
        {"  "} Page under construction
      </div>

      <div className="subSection detailBox" id={2894034}></div>
      <div style={{ clear: "both" }} />
      <div className="subSection detailBox" id={2894035}>
        <div className="subSectionTitle">Basics - Main Menu </div>
        <div className="subSectionDesc">
          So here is a picture of the main menu where you can see the 3 most important parts:
          <br />
          <br />
          <a
            href="https://steamuserimages-a.akamaihd.net/ugc/947343832948952298/13746A4DC2FBBE8753F69D0CE9162790BED5E2BD/"
            className="modalContentLink"
            data-modal-content-popup-url="https://steamcommunity.com/sharedfiles/displayimageformodaldialog/?imageurl=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F947343832948952298%2F13746A4DC2FBBE8753F69D0CE9162790BED5E2BD%2F"
          >
            {/* img placeholder */}
          </a>
          <br />
          <ol>
            <li>
              {" "}
              This is your profile, and in here you can find the quests and the achievements. This
              part is VERY important, and you should check it every day to make sure what you have
              to do and, most important of all, to collect the rewards.
              <br />
              <br />
              The daily quests can be re-rolled once a day by clicking the round arrow on the right
              of it, and you should do that to find the "Win 10 games" quest, since it's the one
              that pay the greater amount of gold of all. Obviously if you get a quest for 1.600
              gold is good too, so don't re-roll it or you'll risk to get a 1.000 gold one.
              <br />
              <br />
              In this section you can also find the replay of all the game you play.
              <br />
              <br />
            </li>
            <li>
              {" "}
              The power tower is where you spin your tokens, and you should check this daily since
              you get a free token every day!
              <br />
              <ul className="bb_ul">
                <li>
                  {" "}
                  Free tokens provide gold or rubies so make sure to spin it every day to get the
                  all the free resources as possible. Every 5 days you get a better reward (rare
                  minimum), which in the worst case is 500 gold.
                  <br />
                  <br />
                </li>
                <li>
                  {" "}
                  Season tokens can be found by playing the season battle pass, and these tokens are
                  the only way to obtain the newest cards. These cards can be crafted (like every
                  other card), but they cost 3 times more (until you reach tier 99 in the battle
                  pass), so using these tokens is the best thing to do to get and upgrade them.
                  <br />
                  <br />
                </li>
                <li>
                  {" "}
                  Power tokens are the best way to spend the excess of gold. Using these tokens
                  provides you new cards (or upgrade for duplicates), but most important of all
                  shards. When you play power tokens always remember to do it for the shards and DO
                  NOT obsess trying to get a specific card or you'll just end up disappointed.
                  <br />
                  <br />
                  Like the daily free token, this tokens provide a guaranteed better reward every 5
                  of them.
                </li>
              </ul>
              <br />
              Season and power tokens rewards you with shards based on the type of card you get:
              <br />
              Common: 15 shards (+25 if the card is already at 400 glory)
              <br />
              Rare: 30 shards (+50 if the card is already at 400 glory)
              <br />
              Supreme: 75 shards (+125 if the card is already at 400 glory)
              <br />
              Legendary: 300 shards (+500 if the card is already at 400 glory)
              <br />
              <br />
              If you reach 400 glory on a card and you find that card again while using a token or
              by buying a bundle in the shop, you will receive a generous amount of extra shards.
              <br />
              <br />
            </li>
            <li>
              {" "}
              The contest area is very important since it can provide you with some powerful reward.
              <br />
              Usually the contest has a series of keys to obtain, you'll get one randomly while
              playing a specific master or, while watching a streamer, everytime he gets a key you
              also get a key. The keys awarded by the twitch drops will be available on the next
              login.
              <br />
              Completing a section gives you the final reward, but getting all the keys is still
              worth it since you'll get shards from them, and even if 10 shards looks a small
              amount, when you get them all you will have many more (sometimes even 600!!!)
            </li>
          </ol>{" "}
          <div style={{ clear: "both" }} />
        </div>
      </div>
      <div style={{ clear: "both" }} />
      <div className="subSection detailBox" id={2894037}>
        <div className="subSectionTitle">Basics - Chat Commands </div>
        <div className="subSectionDesc">
          This are the most useful commands to be used in chat, there are others, but you won't use
          them that often (if you'll ever use them at all).
          <br />
          <br />
          <ul className="bb_ul">
            <li>
              {" "}
              /w &lt;name&gt; : to send a private message to &lt;name&gt;
              <br />
            </li>
            <li>
              {" "}
              /r : to reply to a private message
              <br />
            </li>
            <li>
              {" "}
              /me &lt;message&gt; : to send a chat message as emote
              <br />
            </li>
            <li>
              {" "}
              /deck : post your deck in chat
              <br />
            </li>
            <li>
              {" "}
              /msgdeck &lt;name&gt; : to post your deck as private message to &lt;name&gt;
              <br />
            </li>
            <li>
              {" "}
              /stealdeck : replace your current deck with the one you are looking. <b>WARNING</b>:
              there will be no confirmation, if you type that command your current deck will be
              replaced at once and there is no way back.
              <br />
            </li>
            <li>
              {" "}
              /cud : copy your current deck as text (to be used in forums, discord, etc...)
              <br />
            </li>
            <li>
              {" "}
              /sud : set a string deck as your current deck. <b>WARNING</b>: there will be no
              confirmation, if you type that command your current deck will be replaced at once and
              there is no way back.
              <br />
            </li>
            <li>
              {" "}
              /cid : copy your deck as integer deck.
              <br />
            </li>
            <li>
              {" "}
              /sid &lt;deck ids&gt; : set an integer deck as your current deck. <b>WARNING</b>:
              there will be no confirmation, if you type that command your current deck will be
              replaced at once and there is no way back.
              <br />
            </li>
            <li>
              {" "}
              /showtimestamps : enable the time stamp in every chat message
              <br />
            </li>
            <li>
              {" "}
              /hidetimestamps : disable the time stamp in every chat message
              <br />
            </li>
            <li>
              {" "}
              /setchatbackground &lt;0/1&gt; : use 0 or 1 to enable/disable the chat background
              <br />
            </li>
            <li>
              {" "}
              /setchatfontsize &lt;n&gt; : change &lt;n&gt; with the font size you want
              <br />
            </li>
            <li>
              {" "}
              /resetchat : reset the chat to default settings (requires the game to restart)
              <br />
            </li>
            <li>
              {" "}
              /join &lt;channelName&gt; : to join/create a chat channel
              <br />
            </li>
            <li> /leave &lt;channelName&gt; : to leave a chat channel</li>
          </ul>
          <br />
          The chat also support a series of emojis, to use them just type :&lt;command&gt;:
          <br />
          Where &lt;command&gt; is one of the following:
          <br />
          <ul className="bb_ul">
            <li>
              {" "}
              happy
              <br />
            </li>
            <li>
              {" "}
              hi
              <br />
            </li>
            <li>
              {" "}
              sad
              <br />
            </li>
            <li>
              {" "}
              wow
              <br />
            </li>
            <li>
              {" "}
              angry
              <br />
            </li>
            <li>
              {" "}
              wp
              <br />
            </li>
            <li>
              {" "}
              glhf
              <br />
            </li>
            <li>
              {" "}
              gg
              <br />
            </li>
            <li>
              {" "}
              twitch
              <br />
            </li>
            <li>
              {" "}
              kp1
              <br />
            </li>
            <li>
              {" "}
              gm
              <br />
            </li>
            <li>
              {" "}
              mean
              <br />
            </li>
            <li>
              {" "}
              facepalm
              <br />
            </li>
            <li>
              {" "}
              cool
              <br />
            </li>
            <li>
              {" "}
              greet
              <br />
            </li>
            <li>
              {" "}
              peace
              <br />
            </li>
            <li>
              {" "}
              sleep
              <br />
            </li>
            <li>
              {" "}
              wink
              <br />
            </li>
            <li>
              {" "}
              austria
              <br />
            </li>
            <li>
              {" "}
              belgium
              <br />
            </li>
            <li>
              {" "}
              denmark
              <br />
            </li>
            <li>
              {" "}
              estonia
              <br />
            </li>
            <li>
              {" "}
              finland
              <br />
            </li>
            <li>
              {" "}
              norway
              <br />
            </li>
            <li> switzerland</li>
          </ul>{" "}
          <div style={{ clear: "both" }} />
        </div>
      </div>
      <div style={{ clear: "both" }} />

      <div style={{ clear: "both" }} />
      <div className="subSection detailBox" id={3069646}>
        <div className="subSectionTitle">Basics - Replays </div>
        <div className="subSectionDesc">
          In your profile, you can find the "Match Replay" section where you can find all the
          replays of the latest games you played. <br />
          If you want to share a replay press the button: "Local Replay Folder" and share the ".rp"
          file of the game you want to share.
          <br />
          To view shared replays, just drop the replay file in the same folder mentioned above, and
          restart the game. <div style={{ clear: "both" }} />
        </div>
      </div>
      <div style={{ clear: "both" }} />
      <div className="subSection detailBox" id={3032441}>
        <div className="subSectionTitle">
          - - - - - - - - - - - - - - - - - - - - - - - - - - -{" "}
        </div>
        <div className="subSectionDesc">
          <div style={{ clear: "both" }} />
        </div>
      </div>
    </div>
  );
}
