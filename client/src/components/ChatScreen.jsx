import React from "react";

const ChatScreen = () => {
  return (
    <div className="bg-blue-600 flex flex-col items-center justify-center h-screen p-4">
      <h2 className="text-xl font-bold mb-4 text-white text-center">
        Chat Screen
      </h2>
      <div className="bg-white flex-1 w-full overflow-y-auto rounded-lg p-6">
        {/* Chat messages */}
        <div className="flex flex-col space-y-2">
          {/* Example received message */}
          <div className="flex items-start">
            <div className="bg-gray-200 p-3 rounded-lg">
              <p className="text-sm">Hello there!</p>
            </div>
          </div>

          {/* Example sent message */}
          <div className="flex items-end justify-end">
            <div className="bg-green-500 p-3 rounded-lg">
              <p className="text-sm text-white">Hi! How are you?</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 w-full flex  items-center">
        <input
          type="text"
          placeholder="Type your message... 🚀."
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none"
        />
        {/* <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md">
          Send
        </button> */}

        <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md">
          😊
        </button>
        <button className="ml-2 bg-pink-300 text-white px-4 py-2 rounded-md">
          📎
        </button>
        <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md">
          Send 📤
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
