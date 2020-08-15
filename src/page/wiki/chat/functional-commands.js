import { anchorLinkTarget } from "components/helper";
import mToast from "components/mToast";
import css from "page/wiki/mainscreen/chat-commands.module.scss";
import { MENU_LINKS_CONFIG } from "page/wiki/mainscreen/main-screen";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function FunctionalCommands() {
  const functionalChatConfig = [
    {
      key: "/w <name>",
      description: "to send a private message to <name>",
    },
    {
      key: "/r",
      description: "to reply to a private message",
    },
    {
      key: "/me <message>",
      description: "to send a chat message as emote",
    },
    {
      key: "/deck",
      description: "post your deck in chat",
    },
    {
      key: "/msgdeck <name>",
      description: "to post your deck as private message to <name>",
    },
    {
      key: "/stealdeck",
      description:
        "replace your current deck with the one you are looking. <b>WARNING</b>" +
        "  there will be no confirmation, if you type that command your current deck will be\n" +
        "  replaced at once and there is no way back.",
    },
    {
      key: "/cud",
      description: "copy your current deck as text (to be used in forums, discord, etc...)",
    },
    {
      key: "/sud",
      description:
        "set a string deck as your current deck. <b>WARNING</b>: there will be no\n" +
        "  confirmation, if you type that command your current deck will be replaced at once and\n" +
        "  there is no way back.",
    },
    {
      key: "/cid",
      description: "copy your deck as integer deck.",
    },
    {
      key: "/sid <deck ids>",
      description:
        "set an integer deck as your current deck. <b>WARNING</b>:\n" +
        "  there will be no confirmation, if you type that command your current deck will be\n" +
        "  replaced at once and there is no way back.",
    },
    {
      key: "/showtimestamps",
      description: "enable the time stamp in every chat message",
    },
    {
      key: "/hidetimestamps",
      description: "disable the time stamp in every chat message",
    },
    {
      key: "/setchatbackground <0|1>",
      description: "use 0 or 1 to enable/disable the chat background",
    },
    {
      key: "/setchatfontsize <n>",
      description: "change <n> with the font size you want",
    },
    {
      key: "/resetchat",
      description: "reset the chat to default settings (requires the game to restart)",
    },
    {
      key: "/join <channelName>",
      description: "to join/create a chat channel",
    },
    {
      key: "/leave <channelName>",
      description: "to leave a chat channel",
    },
  ];

  return (
    <div>
      {anchorLinkTarget(MENU_LINKS_CONFIG["Chat Commands: Functional"])}
      <div>
        <fieldset>
          <legend>Commands</legend>
          This are the most useful commands to be used in chat, there are others, but you won't use
          them that often (if you'll ever use them at all).
          <div>
            {functionalChatConfig.map(({ key, description }) => (
              <div key={key} className={css.chatEmotesAbstract}>
                <CopyToClipboard
                  text={`${key}`}
                  onCopy={() => {
                    mToast("Copied to clipboard");
                  }}
                  title="Copy"
                >
                  <span>
                    <h4>{key}</h4>
                    <div>{description}</div>
                  </span>
                </CopyToClipboard>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  );
}
