import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function InterviewPage() {
  const [started, setStarted] = useState(false);
  const [topic, setTopic] = useState("React");
  const [level, setLevel] = useState("Intermediate");
  const [aiText, setAiText] = useState("");
  const [volume, setVolume] = useState(10);

  const [loading, setLoading] = useState(false);

  const conversationRef = useRef<any[]>([]);

  const recognitionRef = useRef<any>(null);
  const isSpeakingRef = useRef(false);
  const isListeningRef = useRef(false);

  // 🎤 START INTERVIEW
  const startInterview = async () => {
    setStarted(true);

    conversationRef.current = [
      {
        role: "system",
        content: `You are a smart, human-like ${topic} ${level} interviewer.

Rules:
- Ask ONE question at a time
- Wait for user's answer
- If answer is good → appreciate + ask deeper
- If weak → guide + ask follow-up
- Be conversational like a real interviewer
- Keep responses short and interactive
- NEVER give long lectures`,
      },
    ];

    await askAI("Start interview");
  };

  // 🤖 AI CALL (FIXED)
  const askAI = async (userInput: string) => {
  try {
    setLoading(true);

    // push user message
    conversationRef.current.push({
      role: "user",
      content: userInput || "..."
    });

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer YOUR_KEY",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct:free",
        messages: [
          { role: "system", content: "You are a professional interviewer." },
          ...conversationRef.current
        ]
      })
    });

    const data = await res.json();

    console.log("AI RESPONSE:", data);

    const reply =
      data?.choices?.[0]?.message?.content ||
      "Try again.";

    // save AI response
    conversationRef.current.push({
      role: "assistant",
      content: reply
    });

    setAiText(reply);

    // SPEAK (important)
    const speech = new SpeechSynthesisUtterance(reply);
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);

  } catch (err) {
    console.error(err);
    setAiText("AI not responding. Check API.");
  } finally {
    setLoading(false);
  }
};

  // 🔊 SPEAK
  const speak = (text: string) => {
    if (!("speechSynthesis" in window)) return;

    isSpeakingRef.current = true;

    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1;

    utter.onend = () => {
      isSpeakingRef.current = false;

      setTimeout(() => {
        startListening();
      }, 400);
    };

    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  };

  // 🎧 LISTEN (IMPROVED)
  const startListening = () => {
    if (isListeningRef.current) return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognitionRef.current = recognition;
    isListeningRef.current = true;

    let hasSpoken = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.trim();

      if (transcript.length > 2) {
        hasSpoken = true;
        isListeningRef.current = false;

        recognition.stop(); // 🔥 STOP PROPERLY

        askAI(transcript);
      }
    };

    recognition.onerror = () => {
      isListeningRef.current = false;
    };

    recognition.onend = () => {
      isListeningRef.current = false;

      if (!hasSpoken) {
        console.log("No speech detected.");
      }
    };

    recognition.start();
  };

  // 🛑 CLEANUP
  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
      recognitionRef.current?.stop();
      isListeningRef.current = false;
    };
  }, []);

  // 🔊 WAVE EFFECT
  useEffect(() => {
    const interval = setInterval(() => {
      setVolume(Math.random() * (isSpeakingRef.current ? 40 : 10));
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // ================= UI =================

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-white">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-10 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent"
        >
          🎤 AI Interview Arena
        </motion.h1>

        <motion.div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <div className="flex gap-4 mb-6">

            {/* 🔥 MORE SUBJECTS */}
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="px-4 py-3 bg-black/40 border border-white/10 rounded-lg"
            >
              <option>React</option>
              <option>DSA</option>
              <option>JavaScript</option>
              <option>Node.js</option>
              <option>System Design</option>
              <option>DBMS</option>
              <option>Operating Systems</option>
              <option>Computer Networks</option>
            </select>

            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="px-4 py-3 bg-black/40 border border-white/10 rounded-lg"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={startInterview}
            className="w-full py-3 rounded-xl font-semibold text-black bg-gradient-to-r from-green-400 to-cyan-400"
          >
            🚀 Start Interview
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-white">
      <motion.h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
        🎤 {topic} Interview ({level})
      </motion.h1>

      <motion.div
        key={aiText}
        className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 w-[650px] text-center"
      >
        {aiText}
      </motion.div>

      {/* 🔥 WAVE */}
      <div className="flex gap-[3px] mt-8">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              height: `${10 + volume + Math.random() * 20}px`,
            }}
            transition={{ duration: 0.2 }}
            className="w-[3px] bg-gradient-to-t from-green-400 to-cyan-400 rounded-full"
          />
        ))}
      </div>

      <p className="mt-3 text-sm text-green-300 opacity-70">
        🎧 AI is interacting with you...
      </p>
    </div>
  );
}