import React, { useEffect, useState } from 'react';
import ReactJson from 'react-json-view';
import './App.css';

function App() {
  const [reqs, setReqs] = useState<{ [key: string]: any }[]>([]);
  const [wsClient, setWsClient] = useState<WebSocket | null>(null);

  const connect = () => {
    const ws = new WebSocket('ws://localhost:8999');
    console.log("connecting...");

    ws.onopen = () => {
      setWsClient(ws);
    };

    ws.onclose = function (e) {
      console.log('Socket is closed. Reconnect will be attempted in 3 second.', e.reason);
      setTimeout(function () {
        connect();
      }, 3000);
    };
  }

  useEffect(() => {
    connect();

    return () => {
      wsClient?.close();
    }
  }, []);

  useEffect(() => {
    if (!wsClient) return;

    wsClient.onmessage = e => {
      const data = JSON.parse(e.data);
      const tReqs = [...reqs];
      console.log(tReqs, tReqs.length);
      if (tReqs.length > 10) {
        console.log("shifting");

        tReqs.pop();
      }
      tReqs.unshift(data);
      setReqs(tReqs);
    };
  }, [reqs, wsClient]);


  return (
    <div className="App">
      {reqs.map((req, i) =>
        <div className="req">
          <ReactJson src={req} />
        </div>
      )}
    </div>
  );
}

export default App;
