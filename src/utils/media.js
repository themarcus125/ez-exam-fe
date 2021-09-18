import { isBrowser } from "../utils/common";
import { postFileAPIWithToken } from "./api";
import { getUser } from "./auth";

const token = getUser()?.tk ?? "";
const username = getUser()?.username ?? "";

export const upload = async (chunk, filename) => {
  if (isBrowser()) {
    const blob = new Blob(chunk, {
      type: "video/webm",
    });
    let phongThi = "";
    const splitURL = window.location.pathname.split("/");
    if (splitURL.length === 4 && splitURL[2] === "exam-taker") {
      phongThi = splitURL[3];
    }
    try {
      const formData = new FormData();
      formData.append("file", blob, `${username}_${phongThi}_${filename}.webm`);
      formData.append("name", `${username}_${phongThi}_${filename}.webm`);
      const request = await postFileAPIWithToken("/videos", formData, token);
      if (request.status === 200) {
        console.log("Video file has uploaded successfully.");
      }
    } catch (error) {
      console.log("Video file has failed to upload successfully !!!", error);
    }
  }
};

export const cleanUpStreamingRef = (
  streamRefCurrent,
  hasAudio = true,
  hasVideo = true,
) => {
  if (hasVideo) {
    const videoTrack = streamRefCurrent.getVideoTracks();
    videoTrack?.[0].stop();
  }
  if (hasAudio) {
    const audioTrack = streamRefCurrent.getAudioTracks();
    audioTrack?.[0].stop();
  }
};
