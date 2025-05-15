import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  try {
    const { name, age, gender, pincode, symptoms, duration } = await req.json();

    const prompt = `A patient named ${name}, aged ${age}, gender: ${gender}, from pincode ${pincode}, reports: ${symptoms}. Issue duration: ${duration}. Suggest possible conditions, treatments, and nearby hospitals with approximate costs.`;

    const response = await axios.post(
      'https://api.together.xyz/v1/chat/completions',
      {
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1024,
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
