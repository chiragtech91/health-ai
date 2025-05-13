export async function POST(req) {
  try {
    const body = await req.json();
    const { name, age, gender, pincode, message } = body;

    const prompt = `
User Details:
- Name: ${name}
- Age: ${age}
- Gender: ${gender}
- Pincode: ${pincode}

Symptoms:
${message}

Based on the above, provide:
1. Possible diagnosis or health suggestion
2. Suggested treatments
3. A list of 3 nearby hospitals/nursing homes (based on pincode) with estimated treatment cost in INR
4. Reliability percentage (just a rough estimate)
`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "X-Title": "AI Health Assistant"
      },
      body: JSON.stringify({
        model: "openrouter/auto", // more flexible
        messages: [
          {
            role: "system",
            content: "You are a helpful health assistant. Provide guidance based on symptoms and user info."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      }),
    });

    const data = await response.json();
    console.log("OpenRouter API response:", JSON.stringify(data, null, 2));

    const aiReply = data?.choices?.[0]?.message?.content || "Sorry, I couldn’t process your request at this time.";

    return Response.json({ reply: aiReply });
  } catch (error) {
    console.error("Error in AI request:", error);
    return Response.json({ reply: "Something went wrong on the server." });
  }
}
