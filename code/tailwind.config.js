/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "bg-red-500",
    "bg-rose-400",
    "bg-amber-600",
    "bg-yellow-600",
    "bg-orange-500",
    "bg-sky-400",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-pink-500",
    "bg-violet-500",
    "bg-lime-500",
    "bg-emerald-500",
    "bg-purple-500",
    "bg-fuchsia-500",
    "bg-slate-500",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
