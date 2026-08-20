import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  return (
    <aside className="w-80 border-r border-base-300 p-4">
      <div className="flex items-center gap-2 mb-6">
        <Users className="size-5" />
        <div className="h-5 w-24 bg-base-300 rounded animate-pulse"></div>
      </div>

      <div className="space-y-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="flex items-center gap-3">
            <div className="size-12 rounded-full bg-base-300 animate-pulse"></div>

            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 bg-base-300 rounded animate-pulse"></div>
              <div className="h-3 w-20 bg-base-300 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;