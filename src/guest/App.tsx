import { useEffect, useState, type ComponentType } from 'react';
import { InputMessage } from '../InputMessage';

export const App: ComponentType = () => {
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (typeof event.data === 'string') {
        setLastMessage(`Host: ${event.data}`);
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
        onChange={(text) => {
          window.parent.postMessage(text, '*');
        }}
      />
      <div>{lastMessage}</div>
    </>
  );
};
