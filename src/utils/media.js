export const download = (chunk, filename) => {
  const blob = new Blob(chunk, {
    type: "video/webm",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  a.download = `${filename}.webm`;
  a.click();
  window.URL.revokeObjectURL(url);
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
