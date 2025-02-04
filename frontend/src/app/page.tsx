"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const HomePage: React.FC = () => {
  const router = useRouter();
  const [supabaseUrl, setSupabaseUrl] = useState<string>("");
  const [supabaseKey, setSupabaseKey] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials = { supabaseUrl, supabaseKey };
    localStorage.setItem("supabaseCredentials", JSON.stringify(credentials));
    router.push("/results");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 max-w-lg bg-white rounded-2xl shadow-lg text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Supabase Compliance Checker
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col text-left">
            <label className="text-sm font-semibold text-gray-600 mb-2">
              Supabase URL:
            </label>
            <input
              type="text"
              value={supabaseUrl}
              onChange={(e) => setSupabaseUrl(e.target.value)}
              className="p-3 border rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col text-left">
            <label className="text-sm font-semibold text-gray-600 mb-2">
              Supabase Key:
            </label>
            <input
              type="password"
              value={supabaseKey}
              onChange={(e) => setSupabaseKey(e.target.value)}
              className="p-3 border rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition duration-200"
          >
            Run Compliance Scan
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
