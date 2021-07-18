import { useEffect, useState, useRef } from "react";
import { download, cleanUpStreamingRef } from "../utils/media";

const useWebcamRecorder = () => {
  const [isPermissionApproved, setIsPermissionApproved] = useState(false);

  const webcamConstraints = {
    audio: true,
    video: true,
  };

  const webcamStreamRef = useRef(null);
  const webcamRecorderRef = useRef(null);
  const webcamRecordedChunkRef = useRef([]);

  useEffect(async () => {
    const handleWebcamDataAvailable = (e) => {
      if (e.data.size > 0) {
        webcamRecordedChunkRef.current.push(e.data);
        download(webcamRecordedChunkRef.current, "webcam-rec");
        cleanUpStreamingRef(webcamStreamRef.current);
      }
    };
    try {
      webcamStreamRef.current = await navigator.mediaDevices.getUserMedia(
        webcamConstraints,
      );
      /* use the stream */
      if (webcamStreamRef.current) {
        const options = { mimeType: "video/webm; codecs=vp9" };
        webcamRecorderRef.current = new MediaRecorder(
          webcamStreamRef.current,
          options,
        );
        webcamRecorderRef.current.ondataavailable = handleWebcamDataAvailable;
        webcamRecorderRef.current.start();
        setIsPermissionApproved(true);
      }
    } catch (err) {
      /* handle the error */
      alert(
        "You're not approved to do the exam, please check your camera/microphone permission and try to reload.",
      );
    }
  }, []);

  return {
    isPermissionApproved,
    webcamRecorderObject: webcamRecorderRef.current,
  };
};

export default useWebcamRecorder;
