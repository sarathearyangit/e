import { useEffect, useState, useRef } from "react";
import { assets } from "../../assets/assets";


const Banner = () => {
  const initialTime = 5 * 60 * 60; // 5 hours
  const [timeLeft, setTimeLeft] = useState(() => {
    const storedTime = parseInt(localStorage.getItem("remainingTime"), 10);
    return storedTime > 0 ? storedTime : initialTime;
  });

  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          localStorage.setItem("remainingTime", 0);
          return 0;
        }
        const newTime = prev - 1;
        localStorage.setItem("remainingTime", newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  const formatTime = (time) => {
    const hr = Math.floor(time / 3600);
    const min = Math.floor((time % 3600) / 60);
    const sec = Math.floor(time % 60);

    return {
      hr: String(hr).padStart(2, "0"),
      min: String(min).padStart(2, "0"),
      sec: String(sec).padStart(2, "0"),
    };
  };

  const { hr, min, sec } = formatTime(timeLeft);

  return (
    <section
      className="relative w-full h-[40vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] flex items-center justify-center sm:justify-start"
      style={{
        backgroundImage: `url(${assets.banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col items-center sm:items-start text-center sm:text-left">

        <h1 className="text-red-600 text-3xl sm:text-5xl md:text-7xl lg:text-8xl uppercase font-extrabold leading-tight">
          Big Sale!
        </h1>

        <h2 className="text-white text-sm sm:text-xl md:text-2xl lg:text-3xl mt-2 font-medium">
          Up to 50% OFF - Limited Time Only!
        </h2>

        {/* Timer */}
        <div className="flex gap-2 mt-4 text-xl sm:text-3xl md:text-5xl font-mono font-bold">
          <div className="bg-zinc-900/90 text-white p-2 rounded shadow-lg">{hr}</div>
          <div className="text-white flex items-center">:</div>
          <div className="bg-zinc-900/90 text-white p-2 rounded shadow-lg">{min}</div>
          <div className="text-white flex items-center">:</div>
          <div className="bg-zinc-900/90 text-white p-2 rounded shadow-lg">{sec}</div>
        </div>
      </div>
    </section>
  )
};

export default Banner;