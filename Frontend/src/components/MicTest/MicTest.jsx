import { useState } from "react";

export default function MicTest() {
  const [status, setStatus] = useState("माइक्रोफोन टेस्ट करने के लिए बटन दबाएं");
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const testMic = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStatus("❌ आपके ब्राउज़र में Speech Recognition सपोर्ट नहीं है");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    setStatus("🎤 सुन रहे हैं... अब बोलें!");
    setIsListening(true);
    setTranscript("");

    recognition.onstart = () => {
      setStatus("🎤 माइक्रोफोन सक्रिय है... बोलना शुरू करें!");
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(finalTranscript || interimTranscript);

      if (finalTranscript) {
        setStatus(`✅ सफलता: "${finalTranscript}"`);
      }
    };

    recognition.onerror = (event) => {
      let errorMsg = `❌ त्रुटि: ${event.error}`;

      if (event.error === "no-speech") {
        errorMsg = "⚠️ कोई आवाज नहीं सुनी गई। फिर से कोशिश करें।";
      } else if (event.error === "network") {
        errorMsg = "🌐 नेटवर्क त्रुटि। इंटरनेट कनेक्शन जांचें।";
      } else if (event.error === "not-allowed") {
        errorMsg = "🔒 माइक्रोफोन की अनुमति नहीं दी गई। ब्राउज़र सेटिंग्स में जांचें।";
      } else if (event.error === "audio-capture") {
        errorMsg = "🎤 माइक्रोफोन नहीं मिला। कनेक्ट करें और फिर कोशिश करें।";
      }

      setStatus(errorMsg);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 flex items-center justify-center p-4">
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        .pulse-animate { animation: pulse 1s infinite; }
        @keyframes wave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.5); }
        }
        .wave-bar { animation: wave 0.6s ease-in-out infinite; }
        .wave-bar:nth-child(1) { animation-delay: 0s; }
        .wave-bar:nth-child(2) { animation-delay: 0.2s; }
        .wave-bar:nth-child(3) { animation-delay: 0.4s; }
        .wave-bar:nth-child(4) { animation-delay: 0.6s; }
      `}</style>

      <div className="w-full max-w-md bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-green-500/20 p-8 space-y-6 shadow-2xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            🎤 माइक्रोफोन टेस्ट
          </h2>
          <p className="text-gray-400 text-sm">
            अपने माइक्रोफोन को टेस्ट करने के लिए बटन दबाएं
          </p>
        </div>

        {/* Test Button */}
        <button
          onClick={testMic}
          disabled={isListening}
          className={`w-full px-6 py-4 rounded-xl font-bold text-lg transition-all transform ${
            isListening
              ? "bg-red-500 text-white cursor-not-allowed animate-pulse"
              : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg hover:shadow-green-500/50 hover:scale-105 active:scale-95"
          }`}
        >
          {isListening ? "🎤 सुन रहे हैं..." : "🎤 माइक्रोफोन टेस्ट करें"}
        </button>

        {/* Wave Animation */}
        {isListening && (
          <div className="flex items-center justify-center gap-2 py-4">
            <div className="w-2 h-8 bg-green-500 rounded-full wave-bar"></div>
            <div className="w-2 h-8 bg-green-500 rounded-full wave-bar"></div>
            <div className="w-2 h-8 bg-green-500 rounded-full wave-bar"></div>
            <div className="w-2 h-8 bg-green-500 rounded-full wave-bar"></div>
          </div>
        )}

        {/* Status Box */}
        <div className="bg-slate-700/50 border border-green-500/30 rounded-xl p-4 space-y-2">
          <p className="text-sm text-gray-400">📊 स्थिति:</p>
          <p className={`text-lg font-semibold ${
            status.includes("✅") ? "text-green-400" :
            status.includes("❌") ? "text-red-400" :
            status.includes("🎤") ? "text-yellow-400" :
            "text-gray-300"
          }`}>
            {status}
          </p>
        </div>

        {/* Transcript Box */}
        {transcript && (
          <div className="bg-slate-700/50 border border-blue-500/30 rounded-xl p-4 space-y-2">
            <p className="text-sm text-gray-400">💬 पहचानी गई टेक्स्ट:</p>
            <p className="text-base text-blue-400 font-semibold break-words">
              "{transcript}"
            </p>
          </div>
        )}

        {/* Troubleshooting Tips */}
        <div className="bg-slate-700/30 border border-yellow-500/20 rounded-xl p-4">
          <p className="text-xs text-yellow-400 font-semibold mb-2">💡 सुझाव:</p>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>✓ माइक्रोफोन कनेक्ट है?</li>
            <li>✓ ब्राउज़र की माइक अनुमति दी?</li>
            <li>✓ इंटरनेट कनेक्शन सही है?</li>
            <li>✓ Chrome या Firefox का उपयोग करें</li>
          </ul>
        </div>

        {/* Back Button */}
        <a
          href="/"
          className="block w-full px-6 py-3 bg-slate-800 border border-green-500/30 text-white rounded-xl font-semibold text-center hover:bg-slate-700 transition"
        >
          ← होम पर वापस जाएं
        </a>
      </div>
    </div>
  );
}