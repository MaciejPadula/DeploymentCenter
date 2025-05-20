import { useEffect, useState } from "react";
import { Cluster } from "../../../shared/models/cluster";
import { useMutation } from "@tanstack/react-query";
import { ChatMessageData } from "../../../shared/components/chat/chat-message-data";
import { Chat } from "../../../shared/components/chat/Chat";
import { useAssistantStoreService } from "../services/assistant-store-service";

type Props = {
  cluster: Cluster;
  chatName: string;
  analyzeQuery: (question: string) => Promise<string | null>;
};

const startMessage = {
  role: "assistant" as const,
  content: "Hello! How can I assist you today?",
};

export function AnalyzeChat(props: Props) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (question: string) => await props.analyzeQuery(question),
  });
  const storeService = useAssistantStoreService(props.chatName);

  const [messages, setMessages] = useState<ChatMessageData[]>(
    storeService.getChatMessages() ?? [startMessage]
  );

  async function handleNewQuestion(question: string) {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: question },
    ]);

    await scrollToBottomWithDelayAsync();

    const result = await mutateAsync(question);

    if (result) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: result },
      ]);

      await scrollToBottomWithDelayAsync();
    }
  }

  useEffect(() => {
    storeService.setChatMessages(messages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

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
    <Chat
      messages={messages}
      title={`${props.cluster.name} Assistant 🤖`}
      onNewMessage={(message) => handleNewQuestion(message)}
      isTyping={isPending}
    />
  );
}
