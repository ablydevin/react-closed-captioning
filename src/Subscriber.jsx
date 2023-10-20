import { useState } from 'react';
import { useChannel } from "ably/react";
import './App.css'

function Subscriber() {
    const texts = {};

const [transcription, setTranscription] = useState('');
const { channel } = useChannel("closed-captions", (message) => {
    setTranscription(processPartialTranscription(message));
   });
   
const processPartialTranscription = (source) => {
    let msg = "";
   
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
   }
   

return (
    <>
      <div>
        <p id="real-time-title">Listening for transcription messages!</p>
        <p id="message">{transcription}</p>
      </div>
    </>
  );
  
}

export default Subscriber