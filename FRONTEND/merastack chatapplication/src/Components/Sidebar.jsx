import { Search, Users } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-80 border-r border-base-300 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-base-300">
        <div className="flex items-center gap-2 mb-4">
          <Users className="size-5" />
          <h2 className="font-semibold">Contacts</h2>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-base-content/50" />

          <input
            type="text"
            placeholder="Search users..."
            className="input input-bordered w-full pl-9"
          />
        </div>
      </div>

      {/* Users */}
      <div className="flex-1 overflow-y-auto p-2">
        {[1, 2, 3, 4, 5].map((user) => (
          <button
            key={user}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-base-200"
          >
            <div className="avatar">
              <div className="size-12 rounded-full">
                <img
                  src={`https://i.pravatar.cc/150?img=${user + 10}`}
                  alt="User"
                />
              </div>
            </div>

            <div className="text-left">
              <h3 className="font-medium">User {user}</h3>
              <p className="text-sm text-base-content/50">
                Click to chat
              </p>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;