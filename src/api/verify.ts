export async function verifySkill(skill: string, input: string) {
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
            role: "user",
            content: `Evaluate this skill: ${skill}.
            Input: ${input}.
            Give:
            1. Score out of 100
            2. Strengths
            3. Weaknesses
            4. Suggestions`
          }
        ]
      })
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "No response";
  } catch (error) {
    return "Error generating result";
  }
}