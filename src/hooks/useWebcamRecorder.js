import { useEffect, useState, useRef } from "react";
import { cleanUpStreamingRef } from "../utils/media";
import { toast } from "react-toastify";

const useWebcamRecorder = (onGetStreamingBlob) => {
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
        const blob = new Blob(webcamRecordedChunkRef.current, {
          type: "video/webm",
        });
        if (onGetStreamingBlob) {
          onGetStreamingBlob(blob);
        }
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
      toast.warning(
        "Vui lòng kiểm tra camera và microphone của bạn và thử tải lại !!!",
      );
    }
  }, []);

  return {
    isPermissionApproved,
    webcamRecorderObject: webcamRecorderRef.current,
  };
};

export default useWebcamRecorder;
