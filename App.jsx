import React, { useState, useEffect } from "react";
import lifeExpectancy from "./lifeExpectancy";

export default function App() {
  const [dob, setDob] = useState("");
  const [country, setCountry] = useState("");
  const [exactAge, setExactAge] = useState(null);
  const [lifeSpan, setLifeSpan] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (dob && country) {
      const age = calculateExactAge(dob);
      setExactAge(age);
      const expectancy = lifeExpectancy[country] || 72.0;
      setLifeSpan(expectancy);
      const progressPercent = Math.min(((age / expectancy) * 100).toFixed(2), 100);
      setProgress(progressPercent);
    }
  }, [dob, country]);

  const calculateExactAge = (dobString) => {
    const [day, month, year] = dobString.split(" ").map(Number);
    const birthDate = new Date(year, month - 1, day);
    const now = new Date();
    const msPerYear = 365.25 * 24 * 60 * 60 * 1000;
    const age = (now - birthDate) / msPerYear;
    return parseFloat(age.toFixed(2));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 font-sans">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold mb-4">🌍 Age Progress Tracker</h1>
        <label className="block text-sm font-medium">Date of Birth (dd mm yyyy)</label>
        <input
          type="text"
          placeholder="27 07 1999"
          className="w-full p-2 border rounded mb-4"
          onChange={(e) => setDob(e.target.value)}
        />
        <label className="block text-sm font-medium">Country</label>
        <input
          type="text"
          placeholder="India"
          className="w-full p-2 border rounded mb-4"
          onChange={(e) => setCountry(e.target.value.trim())}
        />
        {exactAge !== null && (
          <>
            <div className="text-lg mt-4 mb-2">
              You are <strong>{exactAge}</strong> years old.
            </div>
            <div className="text-sm text-gray-600 mb-2">
              Life expectancy in {country}: {lifeSpan} years
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-sm mt-1">{progress}% of expected lifespan completed</div>
          </>
        )}
      </div>
    </div>
  );
}
