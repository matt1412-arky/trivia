import React, { useState, useEffect, useRef } from "react";
import "./SecretCode.css"; // Import CSS for styling
import vid1 from "../assets/vid/vid1.mp4";
import vid2 from "../assets/vid/vid2.mp4";

const SecretCode: React.FC = () => {
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [videoSrc, setVideoSrc] = useState(vid1);
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "danger">(
    "danger"
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
    }
    return () => {
      if (videoRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 180) {
      setShowCodeInput(true);
      setIsFullScreen(false);
    }
  };

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
    }
  };

  const handleSubmit = () => {
    if (code.join("") === "12345") {
      setMessageType("success");
      setMessage("Code correct!");
      setTimeout(() => {
        setVideoSrc(vid2);
        setIsFullScreen(true);
        setShowCodeInput(false);
        setMessage("");
      }, 2000);
    } else {
      setMessageType("danger");
      setMessage("Incorrect code. Please try again.");
    }
  };

  return (
    <div className="secret-code-container">
      <video
        ref={videoRef}
        className={`intro-video ${!isFullScreen && "background-video-opacity"}`}
        src={videoSrc}
        autoPlay
        controls={isFullScreen}
      >
        Your browser does not support the video tag.
      </video>
      {showCodeInput && (
        <div className="code-input-container">
          <p>
            Enter the secret code:
            <span className={`message ${messageType}`}>{message}</span>
          </p>
          <div className="code-inputs">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                maxLength={1}
              />
            ))}
          </div>
          <button className="btn-submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default SecretCode;
