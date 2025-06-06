import { TextField, Typography } from "@mui/material";
import { ChatMessageData } from "./chat-message-data";
import { ChatMessage } from "./ChatMessage";
import { ReactNode, useEffect, useRef } from "react";
import { ChatTyping } from "./ChatTyping";

type ChatProps = {
  title: string;
  messages: ChatMessageData[];
  onNewMessage: (message: string) => void;
  isTyping: boolean;
  typingProfileIcon? : ReactNode;
};

export function Chat(props: ChatProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.messages.length > 0) {
      scrollToBottomWithDelayAsync();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.messages]);

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

  function scrollToBottomWithDelayAsync() {
    return new Promise((resolve) => {
      setTimeout(() => {
        scrollToBottom();
        resolve(true);
      }, 100);
    });
  }

  function scrollToBottom() {
    const chatContainer = document.querySelector(".chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
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
            <ChatMessage
              key={index}
              message={{ content: message.content, role: message.role }}
            />
          ))}
        </div>
      </div>
      {props.isTyping && <ChatTyping profileIcon={props.typingProfileIcon} />}
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
