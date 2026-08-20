import { X } from "lucide-react";

const ChatHeader = () => {
  return (
    <div className="p-3 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full">
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="User"
              />
            </div>
          </div>

          {/* User Info */}
          <div>
            <h3 className="font-medium">John Doe</h3>
            <p className="text-sm text-base-content/60">Online</p>
          </div>
        </div>

        {/* Close Button */}
        <button className="btn btn-ghost btn-sm btn-circle">
          <X className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;