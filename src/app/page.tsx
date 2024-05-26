"use client"
import { useEffect, useState } from "react";

export default function Home() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
          },
        });

        const result = await response.json();
        setData(result);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {

      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <div>{process.env.OPENAI_API_KEY}</div>
    </main>
  );
}
