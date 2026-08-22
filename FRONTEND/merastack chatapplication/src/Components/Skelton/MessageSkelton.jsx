const skeletonMessages = Array(6).fill(null);

const MessageSkeleton = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex items-start gap-3 ${
            idx % 2 === 0 ? "justify-start" : "justify-end flex-row-reverse"
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse shrink-0" />
          <div className="h-16 w-[200px] bg-gray-300 rounded-lg animate-pulse" />
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
