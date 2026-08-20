import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <MessageSquare className="size-8 text-primary" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2">
          Welcome to ChatApp!
        </h2>

        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;