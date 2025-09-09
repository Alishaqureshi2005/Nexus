import React, { useState } from "react";

const OTPVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (element: any, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = element.value.slice(-1); 
    setOtp(newOtp);
  };

  const handleVerify = () => {
    if (otp.join("") === "123456") {
      alert("OTP Verified!");
    } else {
      alert("Invalid OTP!");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Enter OTP</h2>
      <div className="flex gap-2">
        {otp.map((value, index) => (
          <input
            key={index}
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(e.target, index)}
            className="border w-10 h-10 text-center rounded"
          />
        ))}
      </div>
      <button
        className="bg-primary text-white px-4 py-2 rounded mt-4"
        onClick={handleVerify}
      >
        Verify
      </button>
    </div>
  );
};

export default OTPVerification;