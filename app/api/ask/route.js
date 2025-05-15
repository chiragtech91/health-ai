import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  try {
    const { name, age, gender, pincode, symptoms, duration } = await req.json();

    const prompt = `
You are a helpful health assistant.

Patient details:
Name: ${name}
Age: ${age}
Gender: ${gender}
Pincode: ${pincode}
Symptoms: ${symptoms}
Duration of issue: ${duration}

Please provide your response in the following format:

Diagnosis:
<possible conditions>

Treatments:
1. Treatment one
2. Treatment two

Home Remedies:
1. Remedy one
2. Remedy two

Precautions:
1. Precaution one
2. Precaution two

Diet Plan:
1. Diet tip one
2. Diet tip two

Nearby Hospitals:
1. Hospital one
2. Hospital two
3. Hospital three

Estimated Costs: INR <amount>
`;

    const response = await axios.post(
      'https://api.together.xyz/v1/chat/completions',
      {
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2048,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const aiReply = response.data.choices[0].message.content;
    return NextResponse.json({ reply: aiReply });
  } catch (error) {
    console.error('Error:', error?.response?.data || error.message);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
