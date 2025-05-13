export default function Spinner() {
    return (
      <div className="flex justify-center items-center space-x-2 animate-pulse mt-6 text-blue-600">
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-150"></div>
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-300"></div>
        <span className="ml-4 text-sm">Processing your request…</span>
      </div>
    );
  }
  