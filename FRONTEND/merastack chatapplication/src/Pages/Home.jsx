import { useSelector } from "react-redux";
import Sidebar from "../Components/Sidebar.jsx";
import NoChatSelected from "../Components/NoChatSelected.jsx";
import ChatContainer from "../Components/ChatContainer.jsx";

const Home = () => {
  const { selectedUser } = useSelector((state) => state.chat);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-white rounded-lg shadow-md w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full overflow-hidden rounded-lg">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
