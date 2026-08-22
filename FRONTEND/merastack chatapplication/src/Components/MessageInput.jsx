import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Send, X, Video } from "lucide-react";
import { toast } from "react-toastify";
import { sendMessage } from "../store/slices/ChatSlice.js";
import { getSocket } from "../lib/socket.js";
import { pushNewMessage } from "../store/slices/ChatSlice.js";
import { useEffect } from "react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.chat);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
     if (
    String(newMessage.senderId) === String(selectedUser?._id) ||
    String(newMessage.receiverId) === String(selectedUser?._id)
  ) {
    dispatch(pushNewMessage(newMessage));
  }
};

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [selectedUser, dispatch]);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const type = file.type;

    if (type.startsWith("image/")) {
      setMediaType("image");
      const reader = new FileReader();
      reader.onload = () => {
        setMediaPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setMediaFile(file);
    } else if (type.startsWith("video/")) {
      setMediaType("video");
      const videoUrl = URL.createObjectURL(file);
      setMediaPreview(videoUrl);
      setMediaFile(file);
    } else {
      toast.error("Please select an image or video file");
      setMediaFile(null);
      setMediaPreview(null);
      setMediaType("");
    }
  };

  const removeMedia = () => {
    setMediaFile(null);
    setMediaPreview(null);
    setMediaType("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !mediaFile) return;

    const data = new FormData();
    data.append("text", text.trim());
    if (mediaFile) data.append("media", mediaFile);

    await dispatch(
      sendMessage({ receiverId: selectedUser._id, data })
    );

    setText("");
    removeMedia();
  };

  return (
    <div className="p-4 w-full">
      {mediaPreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            {mediaType === "image" ? (
              <img
                src={mediaPreview}
                alt="preview"
                className="w-20 h-20 object-cover rounded-lg border border-gray-700"
              />
            ) : (
              <video
                src={mediaPreview}
                controls
                className="w-32 h-20 object-cover rounded-lg border border-gray-700"
              />
            )}
            <button
              type="button"
              onClick={removeMedia}
              className="absolute -top-2 -right-2 w-5 h-5 bg-zinc-800 text-white rounded-full flex items-center justify-center hover:bg-black"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*,video/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleMediaChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`hidden sm:flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:border-gray-100 transition ${
              mediaPreview ? "text-emerald-500" : "text-gray-400"
            }`}
          >
            <Image size={20} />
          </button>
        </div>

        <button
          type="submit"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-15"
          disabled={!text.trim() && !mediaFile}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
