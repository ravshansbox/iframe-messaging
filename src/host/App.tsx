import { useEffect, useRef, useState, type ComponentType } from 'react';
import { InputMessage } from '../InputMessage';

export const App: ComponentType = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (typeof event.data === 'string') {
        setLastMessage(`Guest: ${event.data}`);
      }
    };
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, []);

  return (
    <>
      <div>Host</div>
      <InputMessage
        onChange={(text) => {
          iframeRef.current?.contentWindow?.postMessage(text, '*');
        }}
      />
      <div>{lastMessage}</div>
      <iframe ref={iframeRef} src="http://localhost:3002" onLoad={() => {}} />
    </>
  );
};
