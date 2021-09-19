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
