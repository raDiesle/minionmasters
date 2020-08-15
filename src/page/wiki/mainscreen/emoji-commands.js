import { anchorLinkTarget } from "components/helper";
import mToast from "components/mToast";
import css from "page/wiki/mainscreen/chat-commands.module.scss";
import { MENU_LINKS_CONFIG } from "page/wiki/mainscreen/main-screen";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function EmojiCommands() {
  const emojiConfig = [
    "switzerland",
    "norway",
    "finland",
    "estonia",
    "denmark",
    "belgium",
    "austria",
    "wink",
    "sleep",
    "peace",
    "greet",
    "cool",
    "facepalm",
    "mean",
    "gm",
    "kp1",
    "twitch",
    "gg",
    "glhf",
    "wp",
    "hi",
    "sad",
    "happy",
    "wow",
    "angry",
  ];

  return (
    <div>
      {anchorLinkTarget(MENU_LINKS_CONFIG["Chat Commands: Emoji"])}
      <fieldset>
        <legend>Commands</legend>
        The chat also support a series of emojis, to use them just type :&lt;command&gt;: or click
        on it to copy it.
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src="img/basics/chat_commands_emoji.png" alt="chat commands emoji" />
        </div>
        <ul className={css.chatEmotes}>
          {emojiConfig.map((key) => (
            <li key={key} className={css.chatEmotesItem}>
              <CopyToClipboard
                text={`:${key}:`}
                onCopy={() => {
                  mToast("Copied to clipboard");
                }}
                title="Copy"
              >
                <span>:{key}:</span>
              </CopyToClipboard>
            </li>
          ))}
        </ul>
      </fieldset>
    </div>
  );
}
