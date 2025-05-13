'use client';
import { useState } from "react";
import Spinner from "@/components/Spinner";
import AIResponse from "@/components/AIResponse";

export default function AskPage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [pincode, setPincode] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Input validation
    if (!name || !age || !gender || !pincode || !message) {
      alert("Please fill in all fields.");
      return;
    }

    if (isNaN(age) || age < 1 || age > 120) {
      alert("Please enter a valid age between 1 and 120.");
      return;
    }

    if (!/^\d{6}$/.test(pincode)) {
      alert("Please enter a valid 6-digit Indian pincode.");
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age, gender, pincode, message }),
      });

      const data = await res.json();
      setResponse(data.reply);
    } catch (error) {
      setResponse("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">AI Health Assistant</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Age"
            className="border p-2 rounded w-full"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <select
            className="border p-2 rounded w-full"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            placeholder="Pincode"
            className="border p-2 rounded w-full"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            required
          />
        </div>
        <textarea
          rows="4"
          placeholder="Describe your health issue..."
          className="border p-2 rounded w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          {loading ? "Processing..." : "Get Suggestions"}
        </button>
      </form>

      {/* Response Section */}
      {loading && <Spinner />}

      {response && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm w-full max-w-2xl">
          <h3 className="text-lg font-semibold mb-2 text-green-700">AI Health Recommendation:</h3>
          <div className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">
            {response.split('\n').map((line, index) => (
              <p key={index} className="mb-2">• {line.trim()}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
