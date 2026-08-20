const MessageSkeleton = () => {
  return (
    <div className="p-4 space-y-6">
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className={`flex items-end gap-2 ${
            item % 2 === 0 ? "justify-end" : "justify-start"
          }`}
        >
          {item % 2 !== 0 && (
            <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse"></div>
          )}

          <div
            className={`h-10 rounded-2xl bg-gray-300 animate-pulse ${
              item % 2 === 0 ? "w-40" : "w-52"
            }`}
          ></div>

          {item % 2 === 0 && (
            <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;