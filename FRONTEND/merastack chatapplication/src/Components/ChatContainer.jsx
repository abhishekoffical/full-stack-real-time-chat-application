const ChatContainer = () => {
  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="h-16 border-b border-base-300 flex items-center px-6">
        <div className="size-10 rounded-full bg-base-300 animate-pulse"></div>

        <div className="ml-3">
          <div className="h-4 w-24 bg-base-300 rounded animate-pulse"></div>
          <div className="h-3 w-16 bg-base-300 rounded mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="text-center text-base-content/50">
          Select a user to start chatting
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-base-300">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="input input-bordered flex-1"
          />

          <button className="btn btn-primary">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;