import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageSquare className="size-5 text-primary" />
          </div>

          <span className="font-bold text-lg">ChatApp</span>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost btn-sm gap-2">
            <Settings className="size-4" />
            <span className="hidden sm:inline">Settings</span>
          </button>

          <button className="btn btn-ghost btn-sm gap-2">
            <User className="size-4" />
            <span className="hidden sm:inline">Profile</span>
          </button>

          <button className="btn btn-ghost btn-sm gap-2 text-error">
            <LogOut className="size-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;