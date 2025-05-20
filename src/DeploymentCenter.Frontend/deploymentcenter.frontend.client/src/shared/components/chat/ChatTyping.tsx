import { ReactNode } from "react";

type ChatTypingProps = {
  profileIcon?: ReactNode;
};

export function ChatTyping(props: ChatTypingProps) {
  return (
    <div className="px-4 flex justify-start items-center space-x-1">
      {props.profileIcon}
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="w-4 h-4 bg-gray-500 rounded-full"
          style={{
            animation: "blink 1.4s infinite",
            animationDelay: `${index * 0.2}s`,
          }}
        ></div>
      ))}
    </div>
  );
}
