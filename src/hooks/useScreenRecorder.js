import { useEffect, useState, useRef } from "react";
import { upload, cleanUpStreamingRef } from "../utils/media";
import { ToastContainer, toast } from "react-toastify";

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
        upload(screenRecordedChunkRef.current, "screen-rec");
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
      toast.warning("Vui lòng kiểm tra quyền ghi màn hình của bạn và thử tải lại !!!");
    }
  }, []);

  return {
    isPermissionApproved,
    screenRecorderObject: screenRecorderRef.current,
  };
};

export default useScreenRecorder;
