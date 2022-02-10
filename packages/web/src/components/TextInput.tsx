import React from "react";

type TextInputProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  setValue: Function;
};

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  placeholder,
  value,
  setValue,
  className = "",
}) => {
  return (
    <div className={`w-full max-w-md ${className}`}>
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
        type="text"
        className="w-full h-10 px-2 border border-slate-400 focus:border-sky-500 outline-none"
      />
    </div>
  );
};

export default TextInput;
