import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { PageTransition } from "@/components/shared/AnimatedNumber";
import { SKILLS } from "@/lib/mock-data";
import type { InterviewMessage } from "@/lib/mock-data";

const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

// 🔥 CLEAN TEXT (fix * issue)
function cleanText(text: string) {
  return text
    .replace(/\*/g, "")
    .replace(/[#`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// 🔊 SPEAK
function speak(text: string, onEnd: () => void) {
  const cleaned = cleanText(text);

  const speech = new SpeechSynthesisUtterance(cleaned);
  speech.lang = "en-US";
  speech.rate = 1;

  speech.onend = onEnd;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
}

// 🧠 MEMORY
let conversation: any[] = [
  {
    role: "system",
    content:
      "You are a strict technical interviewer. Speak clearly without symbols. Ask one question at a time and continue naturally."
  }
];

async function askInterviewAI(input: string) {
  try {
    conversation.push({ role: "user", content: input });

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: conversation
      })
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "No response";

    conversation.push({ role: "assistant", content: reply });

    return reply;
  } catch {
    return "Error generating response";
  }
}

export default function InterviewPage() {
  const [skill, setSkill] = useState("React");
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<InterviewMessage[]>([]);
  const [listening, setListening] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight });
  }, [messages]);

  // 🔴 CLEANUP (fix background voice)
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // 🎤 AUTO LISTEN LOOP
  const startListening = () => {
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;

    recognition.start();
    setListening(true);

    recognition.onresult = async (e: any) => {
      const text = e.results[0][0].transcript;

      addMessage("user", text);

      const ai = await askInterviewAI(text);

      addMessage("ai", ai);

      setListening(false);

      speak(ai, () => {
        setTimeout(startListening, 800);
      });
    };

    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
  };

  const addMessage = (role: "user" | "ai", content: string) => {
    setMessages((prev) => [
      ...prev,
      { role, content, timestamp: new Date().toLocaleTimeString() }
    ]);
  };

  const startInterview = async () => {
    setStarted(true);
    setMessages([]);

    conversation = [
      {
        role: "system",
        content:
          "You are a strict technical interviewer. Speak clearly. Ask one question, wait for answer, continue naturally."
      }
    ];

    const q = await askInterviewAI(`Start ${skill} interview`);
    addMessage("ai", q);

    speak(q, () => {
      setTimeout(startListening, 800);
    });
  };

  return (
    <PageTransition className="max-w-5xl mx-auto">
      {!started ? (
        <div className="text-center mt-20">
          <Bot className="mx-auto w-12 h-12 text-purple-500 mb-4" />
          <h1 className="text-3xl font-bold mb-2">AI Interview</h1>
          <p className="text-gray-400 mb-6">
            Real-time voice interview with AI
          </p>

          <select
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="bg-gray-800 px-4 py-2 rounded-lg"
          >
            {SKILLS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <button
            onClick={startInterview}
            className="block mx-auto mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white"
          >
            Start Interview
          </button>
        </div>
      ) : (
        <>
          {/* CHAT */}
          <div
            ref={chatRef}
            className="h-[500px] overflow-y-auto p-4 space-y-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10"
          >
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[70%] ${
                    m.role === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-800 text-gray-200"
                  }`}
                >
                  {m.content}
                </div>
              </motion.div>
            ))}
          </div>

          {/* 🎤 VOICE WAVE */}
          <div className="flex justify-center mt-6">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: listening ? [10, 30, 10] : 10
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    delay: i * 0.1
                  }}
                  className="w-2 bg-green-400 rounded"
                />
              ))}
            </div>
          </div>
        </>
      )}
    </PageTransition>
  );
}