import { useRef, type ComponentType } from 'react';

type InputMessageProps = {
  disabled: boolean;
  onChange: (text: string) => void;
};

export const InputMessage: ComponentType<InputMessageProps> = ({
  disabled,
  onChange,
}) => {
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
      <input
        ref={inputRef}
        type="text"
        name="message"
        autoComplete="off"
        disabled={disabled}
      />
      <button type="submit" disabled={disabled}>
        Send
      </button>
    </form>
  );
};
