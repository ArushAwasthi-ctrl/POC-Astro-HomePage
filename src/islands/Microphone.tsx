import { useRef, useState, useEffect } from "react";

type VoiceState = "idle" | "active" | "error";

export default function VoiceEntryIsland() {
  const [state, setState] = useState<VoiceState>("idle");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startVoice = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      document.body.classList.add("voice-active");
      setState("active");
    } catch {
      setState("error");
    }
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove("voice-active");
    };
  }, []);

  return (
    <>
      {state === "idle" && (
        <button
          onClick={startVoice}
          className="
            relative
            px-10 py-5
            rounded-2xl
            bg-violet-600
            text-white
            font-medium
            text-lg
            tracking-wide

            shadow-lg
            shadow-violet-600/30

            transition
            duration-300
            ease-out

            hover:bg-violet-500
            hover:shadow-violet-500/40
            hover:-translate-y-0.5

            active:translate-y-0
          "
        >
          Start Voice Demo
        </button>
      )}

      {state === "error" && (
        <p className="text-sm text-red-400 mt-4">
          Mic or camera permission denied
        </p>
      )}

      {state === "active" && (
        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/80
            backdrop-blur-md
            transition
            duration-300
          "
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="
              w-80
              rounded-2xl
              border border-white/10
              shadow-2xl shadow-violet-600/20
            "
          />
        </div>
      )}
    </>
  );
}
