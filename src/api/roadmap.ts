export async function generateRoadmap(skill: string, level: string) {
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
            content: `You are a career mentor.

Create a structured roadmap to learn ${skill} at ${level} level.

Rules:
- Be practical and structured
- Include steps in order
- Include tools/resources

Return in JSON:
{
  "steps": ["step1", "step2"],
  "timeline": "time estimate",
  "resources": ["resource1", "resource2"]
}`
          }
        ]
      })
    });

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content;

    const parsed = JSON.parse(text.match(/\{[\s\S]*\}/)[0]);

    return parsed;

  } catch (err) {
    console.error(err);

    return {
      steps: ["Start with basics", "Practice projects"],
      timeline: "2-3 months",
      resources: ["YouTube", "Docs"]
    };
  }
}