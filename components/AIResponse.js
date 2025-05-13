export default function AIResponse({ message }) {
    const formatMessage = (text) => {
      const lines = text.split("\n").filter(line => line.trim() !== "");
  
      return lines.map((line, index) => {
        if (line.match(/^\d+\. /)) {
          return <li key={index} className="ml-4 list-decimal">{line}</li>;
        } else if (line.includes(":")) {
          const [title, ...rest] = line.split(":");
          return (
            <p key={index} className="mb-2">
              <strong>{title.trim()}:</strong> {rest.join(":").trim()}
            </p>
          );
        } else {
          return <p key={index} className="mb-2">{line}</p>;
        }
      });
    };
  
    return (
      <div className="bg-white p-6 rounded-md shadow-md mt-6 border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-green-700">🩺 Health Assistant Response</h2>
        <div className="text-gray-800 space-y-2">
          {formatMessage(message)}
        </div>
      </div>
    );
  }
  