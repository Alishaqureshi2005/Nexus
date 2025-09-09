import React, { useState } from "react";

import zxcvbn from "zxcvbn";

const PasswordStrength = () => {
  const [password, setPassword] = useState("");

  const testResult = zxcvbn(password);
  const strength = ["Weak", "Fair", "Good", "Strong", "Very Strong"];
  const score = testResult.score;

  return (
    <div className="p-4 max-w-sm">
      <label className="font-bold">Create Password</label>
      <input
        type="password"
        className="border rounded w-full p-2 mt-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="mt-2">
        <div className="h-2 rounded bg-gray-300">
          <div
            className={`h-2 rounded bg-green-500`}
            style={{ width: `${(score + 1) * 20}%` }}
          ></div>
        </div>
        <p className="text-sm mt-1">Strength: {strength[score]}</p>
      </div>
    </div>
  );
};

export default PasswordStrength;