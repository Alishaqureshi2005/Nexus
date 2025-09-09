import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const VideoCallPage = () => {
  const webcamRef = useRef<Webcam>(null);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isInCall, setIsInCall] = useState(false);

  // Start Call
  const handleStartCall = () => {
    setIsInCall(true);
  };

  // End Call
  const handleEndCall = () => {
    setIsInCall(false);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Video Meeting</h1>

      {/* Video Container */}
      <div className="flex gap-6 mb-6">
        {/* Local Video */}
        {isVideoOn && (
          <div className="w-64 h-48 bg-black rounded-lg overflow-hidden">
            <Webcam
              ref={webcamRef}
              audio={isAudioOn}
              mirrored={true}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Mock Remote Video */}
        {isInCall && (
          <div className="w-64 h-48 bg-gray-800 rounded-lg flex items-center justify-center text-white">
            Remote Participant
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        {!isInCall ? (
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-lg"
            onClick={handleStartCall}
          >
            Start Call
          </button>
        ) : (
          <button
            className="bg-red-500 text-white px-6 py-2 rounded-lg"
            onClick={handleEndCall}
          >
            End Call
          </button>
        )}

        <button
          className={`px-4 py-2 rounded-lg ${isAudioOn ? "bg-blue-500" : "bg-gray-400"}`}
          onClick={() => setIsAudioOn(!isAudioOn)}
        >
          {isAudioOn ? "Mute" : "Unmute"}
        </button>

        <button
          className={`px-4 py-2 rounded-lg ${isVideoOn ? "bg-blue-500" : "bg-gray-400"}`}
          onClick={() => setIsVideoOn(!isVideoOn)}
        >
          {isVideoOn ? "Video Off" : "Video On"}
        </button>
      </div>
    </div>
  );
};

export default VideoCallPage;