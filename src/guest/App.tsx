import { useEffect, useState, type ComponentType } from 'react';
import { InputMessage } from '../InputMessage';

export const App: ComponentType = () => {
  const [port, setPort] = useState<MessagePort | null>(null);
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const [port] = event.ports;
      if (port) {
        port.addEventListener('message', (event) => {
          setLastMessage(`Host: ${event.data}`);
        });
        port.start();
        setPort(port);
      }
    };
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, []);

  return (
    <>
      <div>Guest</div>
      <InputMessage
        disabled={port === null}
        onChange={(text) => {
          port?.postMessage(text);
        }}
      />
      <div>{lastMessage}</div>
    </>
  );
};
