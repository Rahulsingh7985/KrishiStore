import { useEffect, useState } from "react";

const slides = [
  {
    title: "Anjali BeejBhandar",
    desc: "Trusted seed & agriculture store since 2015",
    img: "https://res.cloudinary.com/decqt0izm/image/upload/v1766120122/bj0pinonuybkjuawbwpu.jpg",
  },
  {
    title: "Owner: Suneel Patel",
    desc: "10+ years experience in agriculture products",
    img: "https://res.cloudinary.com/decqt0izm/image/upload/v1766130405/aif6p54qc7kotdhodosz.png",
  },
  {
    title: "Quality Assured",
    desc: "Certified seeds & crop medicines available",
    img: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
  },
];

export default function HomeStampSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center mb-10">
      <div className="bg-pink-50 w-full max-w-5xl rounded-lg shadow-lg p-6 flex items-center gap-6 transition-all duration-500">
        <img
          src={slides[index].img}
          alt="stamp"
          className="w-30 h-40 rounded-2xl border-4 border-green-600 object-cover"
        />

        <div>
          <h2 className="text-xl font-bold text-green-800">
            {slides[index].title}
          </h2>
          <p className="text-gray-600 text-sm">{slides[index].desc}</p>
        </div>
      </div>
    </div>
  );
}
