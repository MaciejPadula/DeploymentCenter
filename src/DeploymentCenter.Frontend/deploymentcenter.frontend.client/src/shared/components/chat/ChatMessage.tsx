import Markdown from "react-markdown";
import { ChatMessageData } from "./chat-message-data";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

import "./ChatMessage.scss";

type ChatMessageProps = {
  message: ChatMessageData;
};

export function ChatMessage(props: ChatMessageProps) {
  console.log("ChatMessage", props.message);

  return (
    <div
      className={`w-full my-1 flex flex-row ${
        props.message.role === "user" ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className="p-2 rounded-md mb-2 overflow-auto"
        style={{ maxWidth: "90%", backgroundColor: "#232323" }}
      >
        <Markdown
          className={"message-wrapper"}
          remarkPlugins={[remarkBreaks, remarkGfm]}
        >
          {props.message.content}
        </Markdown>
      </div>
    </div>
  );
}
