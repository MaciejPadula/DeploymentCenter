export function ChatTyping() {
  return (
    <div className="px-4 flex justify-start items-center space-x-1">
      <div>🤖</div>
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
