import { TextField, Typography } from "@mui/material";
import { ChatMessageData } from "./chat-message-data";
import { ChatMessage } from "./ChatMessage";
import { useRef } from "react";

type ChatProps = {
  title: string;
  messages: ChatMessageData[];
  onNewMessage: (message: string) => void;
  isTyping: boolean;
};

export function Chat(props: ChatProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function onEnterKeyPress(event: React.KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey && inputRef.current) {
      event.preventDefault();
      const question = inputRef.current.value;

      if (question) {
        props.onNewMessage(question);
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <Typography variant="h6" className="p-4">
        {props.title}
      </Typography>
      <div className="flex flex-col flex-1 overflow-y-auto p-4 chat-container">
        <div className="flex flex-col">
          {props.messages.map((message, index) => (
            <ChatMessage key={index} message={{content: message.content, role: message.role}} />
          ))}
        </div>
      </div>
      {props.isTyping && (
        <div className="px-4 pb-2 flex justify-center items-center space-x-1">
          <div
            className="w-2 h-2 bg-gray-500 rounded-full"
            style={{
              animation: "blink 1.4s infinite",
              animationDelay: "0s",
            }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-500 rounded-full"
            style={{
              animation: "blink 1.4s infinite",
              animationDelay: "0.2s",
            }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-500 rounded-full"
            style={{
              animation: "blink 1.4s infinite",
              animationDelay: "0.4s",
            }}
          ></div>
        </div>
      )}
      <div className="p-4 flex flex-row items-center gap-2">
        <TextField
          className="w-full"
          variant={"outlined"}
          label="Your question"
          multiline
          onKeyDown={onEnterKeyPress}
          disabled={props.isTyping}
          inputRef={inputRef}
        />
      </div>
    </div>
  );
}
