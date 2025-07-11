import useWebSocket from 'react-use-websocket';
import { useState, useEffect } from 'react'

function Socketa() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    'ws://localhost:8000/ws',
    {
      onOpen: () => console.log('Conexión establecida'),
      shouldReconnect: (closeEvent) => true, // Reconexión automática
      reconnectInterval: 3000,
    }
  );

  useEffect(() => {
    if (lastMessage !== null) {
      setMessages((prev) => [...prev, lastMessage.data]);
    }
  }, [lastMessage]);

  const handleSend = () => {
    sendMessage(message);
    setMessage('');
  };

  return (
    <div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Enviar</button>
      <div>
        {messages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
    </div>
  );
}

export default Socketa;