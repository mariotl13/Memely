"use client"
import OpenAI from "openai";
import { useEffect, useState } from "react";

const openai = new OpenAI({
  apiKey: process.env['NEXT_PUBLIC_OPENAI_API_KEY'], // This is the default and can be omitted,
  dangerouslyAllowBrowser: true
});

export default function Home() {

  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chatCompletion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo-16k",
          messages: [
            {
              "role": "system",
              "content": "You are a helpful assistant."
            },
            {
              "role": "user",
              "content": "Hello!"
            }
          ]
        });

        setData(chatCompletion);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {

      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <div>
        {data.result?.choices?.[0].content}
      </div>
    </main>
  );
}
