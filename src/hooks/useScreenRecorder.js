import { useEffect, useState, useRef } from "react";
import { download, cleanUpStreamingRef } from "../utils/media";

const useScreenRecorder = () => {
  const [isPermissionApproved, setIsPermissionApproved] = useState(false);

  const screenConstraints = {
    video: {
      cursor: "always",
    },
    audio: false,
  };

  const screenStreamRef = useRef(null);
  const screenRecorderRef = useRef(null);
  const screenRecordedChunkRef = useRef([]);

  useEffect(async () => {
    const handleScreenDataAvailable = (e) => {
      if (e.data.size > 0) {
        screenRecordedChunkRef.current.push(e.data);
        download(screenRecordedChunkRef.current, "screen-rec");
        cleanUpStreamingRef(screenStreamRef.current, false);
      }
    };
    try {
      screenStreamRef.current = await navigator.mediaDevices.getDisplayMedia(
        screenConstraints,
      );
      /* use the stream */
      if (screenStreamRef.current) {
        const options = { mimeType: "video/webm; codecs=vp9" };
        screenRecorderRef.current = new MediaRecorder(
          screenStreamRef.current,
          options,
        );
        screenRecorderRef.current.ondataavailable = handleScreenDataAvailable;
        screenRecorderRef.current.start();
        setIsPermissionApproved(true);
      }
    } catch (err) {
      /* handle the error */
      alert(
        "You're not approved to do the exam, please check your screen recording permission and try to reload.",
      );
    }
  }, []);

  return {
    isPermissionApproved,
    screenRecorderObject: screenRecorderRef.current,
  };
};

export default useScreenRecorder;
