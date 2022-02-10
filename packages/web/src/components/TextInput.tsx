import React from "react";

type TextInputProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  id: string;
  label: string;
  type?: "text" | "password";
  placeholder?: string;
  value: string;
  setValue: Function;
};

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  type = "text",
  placeholder = "",
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
        type={type}
        className="w-full h-10 px-2 border border-slate-400 rounded focus:border-sky-500 outline-none mt-1"
      />
    </div>
  );
};

export default TextInput;
