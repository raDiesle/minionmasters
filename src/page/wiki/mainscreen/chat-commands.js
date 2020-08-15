import FunctionalCommands from "page/wiki/chat/functional-commands";
import EmojiCommands from "page/wiki/mainscreen/emoji-commands";
import React from "react";

export default function ChatCommands() {
  return (
    <div>
      <FunctionalCommands />
      <EmojiCommands />
    </div>
  );
}
