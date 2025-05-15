import { FaStethoscope } from 'react-icons/fa';

export default function AIResponse({ message }) {
  const formatMessage = (text) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');

    return lines.map((line, index) => {
      // Headings end with ":" and are not numbered list items
      if (line.match(/^[A-Za-z\s]+:$/)) {
        return (
          <h3 key={index} className="mt-6 mb-2 text-xl font-bold text-green-800 flex items-center space-x-2">
            <FaStethoscope />
            <span>{line.replace(':', '')}</span>
          </h3>
        );
      }
      // Numbered lists like "1. text"
      else if (line.match(/^\d+\. /)) {
        return <li key={index} className="ml-6 list-decimal mb-1 text-gray-700">{line.replace(/^\d+\.\s*/, '')}</li>;
      }
      // Lines with colon but not headings (like key: value)
      else if (line.includes(':')) {
        const [title, ...rest] = line.split(':');
        return (
          <p key={index} className="mb-2">
            <strong>{title.trim()}:</strong> {rest.join(':').trim()}
          </p>
        );
      }
      // Normal paragraph
      else {
        return <p key={index} className="mb-2 text-gray-700">{line}</p>;
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md mt-6 border border-gray-200 max-w-3xl mx-auto">
      <h2 className="text-2xl font-extrabold mb-4 text-green-700 flex items-center space-x-3">
        <FaStethoscope size={28} />
        <span>Health Assistant Response</span>
      </h2>
      <div className="text-gray-800 leading-relaxed">
        {formatMessage(message)}
      </div>
    </div>
  );
}
