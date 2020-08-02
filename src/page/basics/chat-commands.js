import React from "react";
import FunctionalCommands from "page/basics/chat/functional-commands";
import EmojiCommands from "page/basics/mainscreen/emoji-commands";

export default function ChatCommands() {
  return (
    <div>
      <FunctionalCommands />
      <EmojiCommands />
    </div>
  );
}
