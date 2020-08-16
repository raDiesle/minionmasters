import FunctionalCommands from "page/wiki/main-screen/chat/functional-commands";
import EmojiCommands from "page/wiki/main-screen/emoji-commands";
import React from "react";

export default function ChatCommands() {
  return (
    <div>
      <FunctionalCommands />
      <EmojiCommands />
    </div>
  );
}
