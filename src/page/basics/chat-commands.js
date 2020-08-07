import FunctionalCommands from "page/basics/chat/functional-commands";
import EmojiCommands from "page/basics/mainscreen/emoji-commands";
import React from "react";

export default function ChatCommands() {
  return (
    <div>
      <FunctionalCommands />
      <EmojiCommands />
    </div>
  );
}
