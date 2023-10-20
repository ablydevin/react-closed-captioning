import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import RecordRTC, { StereoAudioRecorder } from "recordrtc";
import { useChannel } from "ably/react";
import "./App.css";

function Publisher() {
  const texts = {};
  let recorder = null;

  const [socketUrl, setSocketUrl] = useState("");
  const [shouldConnect, setShouldConnect] = useState(false);
  const [transcription, setTranscription] = useState("");

  const { channel } = useChannel('closed-captions');

  const { sendJsonMessage, lastMessage } = useWebSocket(
    socketUrl,
    {
      onOpen: () => {
        console.log("AssemblyAI WebSocket opened");
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
          recorder = new RecordRTC(stream, {
            type: "audio",
            mimeType: "audio/webm;codecs=pcm", // endpoint requires 16bit PCM audio
            recorderType: StereoAudioRecorder,
            timeSlice: 250, // set 250 ms intervals of data that sends to AAI
            desiredSampRate: 16000,
            numberOfAudioChannels: 1, // realtime requires only one channel
            bufferSize: 16384,
            audioBitsPerSecond: 128000,
            ondataavailable: (blob) => {
              const reader = new FileReader();
              reader.onload = () => {
                const base64data = reader.result;
                // audio data must be sent as a base64 encoded string
                sendJsonMessage({
                  audio_data: base64data.split("base64,")[1],
                });
              };
              reader.readAsDataURL(blob);
            },
          });
          recorder.startRecording();
        });
      },
    },
    shouldConnect
  );

  useEffect(() => {
    if (lastMessage !== null) {
      setTranscription(processPartialTranscription(lastMessage));
    }
  }, [lastMessage]);

  async function start(e) {
    const response = await fetch("/api/tokens/transcription");
    const { token } = await response.json();
    setSocketUrl(
      `wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000&token=${token}`
    );
    setShouldConnect(true);
  }

  async function stop(e) {
    setShouldConnect(false);
    if (recorder) recorder.pauseRecording();
  }

  const processPartialTranscription = (source) => {
    let msg = "";

    channel.publish('cc-snippet', source.data);

    const res = JSON.parse(source.data);
    if (res.text) {
      texts[res.audio_start] = res.text;
      const keys = Object.keys(texts);
      keys.sort((a, b) => a - b);
      for (const key of keys) {
        if (texts[key]) {
          msg += ` ${texts[key]}`;
        }
      }
    }
    return msg;
  };

  return (
    <div>
      <p id="real-time-title">Click start to begin recording!</p>
      <button id="start" onClick={start}>
        Start
      </button>
      <button id="stop" onClick={stop}>
        Stop
      </button>
      <p id="message">{transcription}</p>
    </div>
  );
}

export default Publisher;
