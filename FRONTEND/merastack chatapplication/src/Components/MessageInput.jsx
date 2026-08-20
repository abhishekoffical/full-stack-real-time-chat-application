import { Image, Send, Video } from "lucide-react";

const MessageInput = () => {
  return (
    <div className="p-4 border-t border-base-300">
      <form className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="input input-bordered flex-1"
        />

        <button
          type="button"
          className="btn btn-ghost btn-circle"
          title="Send image"
        >
          <Image className="size-5" />
        </button>

        <button
          type="button"
          className="btn btn-ghost btn-circle"
          title="Send video"
        >
          <Video className="size-5" />
        </button>

        <button
          type="submit"
          className="btn btn-primary btn-circle"
        >
          <Send className="size-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;