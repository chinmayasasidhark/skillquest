export async function askInterview(question: string) {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
          {
            role: "system",
            content: "You are a strict technical interviewer. Ask follow-up questions and evaluate answers."
          },
          {
            role: "user",
            content: question
          }
        ]
      })
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content;

  } catch (err) {
    return "Error generating response";
  }
}