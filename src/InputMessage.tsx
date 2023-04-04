import { useRef, type ComponentType } from 'react';

type InputMessageProps = {
  onChange: (text: string) => void;
};

export const InputMessage: ComponentType<InputMessageProps> = ({ onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (inputRef.current === null) {
          return;
        }
        onChange(inputRef.current.value);
        inputRef.current.value = '';
      }}
    >
      <input ref={inputRef} type="text" name="message" autoComplete="off" />
      <button type="submit">Send</button>
    </form>
  );
};
