import { anchorLinkTarget } from "components/helper";
import mToast from "components/mToast";
import { MENU_LINKS_CONFIG } from "page/basics/main-screen";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import css from "./chat-commands.module.scss";

export default function ChatCommands() {
  return (
    <div>
      {anchorLinkTarget(MENU_LINKS_CONFIG["Chat Commands"])}
      <div>
        <fieldset>
          <legend>Functional Commands</legend>
          This are the most useful commands to be used in chat, there are others, but you won't use
          them that often (if you'll ever use them at all).
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
        </fieldset>
        <fieldset>
          <legend>Emoji Commands</legend>
          The chat also support a series of emojis, to use them just type :&lt;command&gt;:
          <br />
          Where &lt;command&gt; is one of the following:
          <br />
          <ul className={css.chatEmotes}>
            <CopyToClipboard
              text={"happy"}
              onCopy={() => {
                mToast("Copied to clipboard");
              }}
              title="Copy link"
            >
              <li>happy</li>
            </CopyToClipboard>
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
        </fieldset>
      </div>
    </div>
  );
}
