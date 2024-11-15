import React, { useEffect, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("ws://10.20.153.104:8080");
    setWs(socket);
    socket.onmessage = (event) => {
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          const message = reader.result;
          setMessages((prevMessages) => [...prevMessages, message]);
        };
        reader.readAsText(event.data);
      } else {
        setMessages((prevMessages) => [...prevMessages, event.data]);
      }
    };
    socket.onclose = () => {
      console.log("Closed connection");
    };

    return () => socket.close();
  }, []);
  const handleSendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
      setMessage("");
    }
  };
  return (
    <div>
      <h1>Chat god</h1>
      <div
        style={{
          border: "3px solid black",
          padding: "30px",
          height: "400px",
          overflowY: "scroll",
        }}
      >
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default App;
