import { ChatMessageData } from "../../../shared/components/chat/chat-message-data";

export function useAssistantStoreService(chatName: string) {
    const chatNameKey = `AI-CHAT:${chatName}`;

  function getChatMessages(): ChatMessageData[] | null {
    const messages = sessionStorage.getItem(chatNameKey);
    if (messages) {
      return JSON.parse(messages);
    }

    return null;
  }

  function setChatMessages(messages: ChatMessageData[]) {
    sessionStorage.setItem(chatNameKey, JSON.stringify(messages));
  }

  return {
    getChatMessages,
    setChatMessages,
  };
}
