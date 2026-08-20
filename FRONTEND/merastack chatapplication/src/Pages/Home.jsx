import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import ChatContainer from "../Components/ChatContainer";
import NoChatSelected from "../Components/NoChatSelected";

const Home = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar />

        <ChatContainer />
      </div>
    </div>
  );
};

export default Home;