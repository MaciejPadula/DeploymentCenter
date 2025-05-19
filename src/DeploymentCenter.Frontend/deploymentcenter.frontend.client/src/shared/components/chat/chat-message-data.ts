export interface ChatMessageData {
  role: "user" | "assistant" | "error";
  content: string;
}