import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../store/slices/ChatSlice.js";
// import { getSocket } from "../lib/socket";
import ChatHeader from "../Components/ChatHeader.jsx";
import MessageInput from "../Components/MessageInput.jsx";
import MessageSkeleton from "../Components/Skelton/MessageSkelton.jsx";

const formatMessageTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const ChatContainer = () => {
  const { messages, isMessagesLoading, selectedUser } = useSelector(
    (state) => state.chat
  );
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser?._id) return;
    dispatch(getMessages(selectedUser._id));
  }, [selectedUser?._id, dispatch]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-white">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length > 0 ? (
          messages.map((message, index) => {
  console.log("MESSAGE:", message);

  if (!message) return null;

  const isSender = String(message.senderId) === String(authUser?._id);
            return (
              <div
                key={message._id}
                ref={index === messages.length - 1 ? messageEndRef : null}
                className={`flex items-end gap-3 ${
                  isSender ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full overflow-hidden border shrink-0 ${
                    isSender ? "order-2 ml-3" : "order-1 mr-3"
                  }`}
                >
                  <img
                    src={
                      isSender
                        ? authUser?.avatar?.url || "/avatar-holder.avif"
                        : selectedUser?.avatar?.url || "/avatar-holder.avif"
                    }
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div
                  className={`max-w-xs sm:max-w-sm md:max-w-md px-4 py-2 rounded-2xl text-sm ${
                    isSender
                      ? "bg-blue-600/20 text-black order-1"
                      : "bg-gray-200 text-black order-2"
                  }`}
                >
                  {message.media?.includes(".mp4") ||
                  message.media?.includes(".webm") ||
                  message.media?.includes(".mov") ? (
                    <video
                      src={message.media}
                      controls
                      className="w-full rounded-md mb-2"
                    />
                  ) : message.media ? (
                    <img
                      src={message.media}
                      alt="attachment"
                      className="w-full rounded-md mb-2"
                    />
                  ) : null}

                  {message.text && <p>{message.text}</p>}

                  <span className="block text-[10px] mt-1 text-right text-gray-400">
                    {formatMessageTime(message.createdAt)}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            No messages yet. Say hi!
          </div>
        )}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
