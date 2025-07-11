import { SideChatbot } from "./SideChatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Main content area */}
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to Your App
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Click the chat button in the bottom right to start a conversation with our AI assistant.
        </p>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Your Content Here
          </h2>
          <p className="text-gray-600">
            This is your main application content. The chatbot is available as a side panel
            that can be opened by clicking the floating button.
          </p>
        </div>
      </div>
      
      {/* Side Chatbot */}
      <SideChatbot />
    </div>
  );
};

export default Index;