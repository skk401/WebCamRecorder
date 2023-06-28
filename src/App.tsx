import React, { useState } from "react";
import "./App.css";
import {
  useRecordWebcam,
  RecordWebcam,
  WebcamStatus,
} from "react-record-webcam";

const OPTIONS = {
  filename: "test-filename",
  fileType: "mp4",
  width: 1920,
  height: 1080,
};

export const App = () => {
  const [retakeCount, setRetakeCount] = useState(0);
  const recordWebcam = useRecordWebcam(OPTIONS);

  const handleRetake = () => {
    if (retakeCount < 2) {
      setRetakeCount(retakeCount + 1);
      recordWebcam.retake();
    } else {
      // Maximum retake limit reached
      alert("Maximum retake limit reached!");
    }
  };

  const handleGetRecording = async () => {
    const blob = await recordWebcam.getRecording();
    if (blob) {
      // Handle the recording data here
      console.log({ blob });
    }
  };

  return (
    <div className="demo-section">
      <h1>Webcam Recorder</h1>
      <p>Camera status: {recordWebcam.status}</p>
      <div>
        <button
          onClick={recordWebcam.open}
          disabled={
            recordWebcam.status === "OPEN" ||
            recordWebcam.status === "RECORDING" ||
            recordWebcam.status === "PREVIEW"
          }
        >
          Open Camera
        </button>
        <button
          onClick={recordWebcam.close}
          disabled={
            recordWebcam.status === "CLOSED" ||
            recordWebcam.status === "PREVIEW"
          }
        >
          Close Camera
        </button>
        <button
          onClick={recordWebcam.start}
          disabled={
            recordWebcam.status === "CLOSED" ||
            recordWebcam.status === "RECORDING" ||
            recordWebcam.status === "PREVIEW"
          }
        >
          Start Recording
        </button>
        <button
          onClick={recordWebcam.stop}
          disabled={recordWebcam.status !== "RECORDING"}
        >
          Stop Recording
        </button>
        <button
          onClick={handleRetake}
          disabled={recordWebcam.status !== "PREVIEW"}
        >
          Retake
        </button>
        <button
          onClick={recordWebcam.download}
          disabled={recordWebcam.status !== "PREVIEW"}
        >
          Download Recording
        </button>
        <button
          onClick={handleGetRecording}
          disabled={recordWebcam.status !== "PREVIEW"}
        >
          Get Recording
        </button>
      </div>
      <video
        ref={recordWebcam.webcamRef}
        autoPlay
        style={{
          display:
            recordWebcam.status === "OPEN" ||
            recordWebcam.status === "RECORDING"
              ? "block"
              : "none",
        }}
      ></video>
      <video ref={recordWebcam.previewRef} autoPlay
      style={{
        display:
          recordWebcam.status === "PREVIEW"
            ? "block"
            : "none",
      }}
      ></video>
    </div>
  );
};
