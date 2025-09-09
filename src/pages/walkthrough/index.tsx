import React, { useState } from "react";
import Joyride from "react-joyride";

const Walkthrough = () => {
  const [run, setRun] = useState(true);

  const steps = [
    {
      target: ".calendar-section",
      content: "Here you can manage your availability and schedule meetings.",
    },
    {
      target: ".wallet-section",
      content: "This is your wallet where you can manage deposits and withdrawals.",
    },
    {
      target: ".documents-section",
      content: "Upload and sign documents here.",
    },
  ];

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      styles={{
        options: {
          zIndex: 10000,
        },
      }}
    />
  );
};

export default Walkthrough;