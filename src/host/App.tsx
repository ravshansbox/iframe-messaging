import { useState, type ComponentType } from 'react';
import { InputMessage } from '../InputMessage';

export const App: ComponentType = () => {
  const [port, setPort] = useState<MessagePort | null>(null);
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  return (
    <>
      <div>Host</div>
      <InputMessage
        disabled={port === null}
        onChange={(text) => {
          port?.postMessage(text);
        }}
      />
      <div>{lastMessage}</div>
      <iframe
        src="http://localhost:3002"
        onLoad={(event) => {
          const { port1, port2 } = new MessageChannel();
          port1.addEventListener('message', (event) => {
            setLastMessage(`Guest: ${event.data}`);
          });
          port1.start();
          setPort(port1);
          event.currentTarget.contentWindow?.postMessage('init', '*', [port2]);
        }}
      />
    </>
  );
};
