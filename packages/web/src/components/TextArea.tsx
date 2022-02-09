import React from "react";

type TextAreaProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  id: string;
  label: string;
  value: string;
  setValue: Function;
};

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  value,
  setValue,
  className = "",
  ...props
}) => {
  return (
    <div className={`w-full max-w-md ${className}`} {...props}>
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <textarea
        id={id}
        className="w-full mt-1 p-2 border border-slate-400 rounded focus:border-sky-500 outline-none"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      />
    </div>
  );
};

export default TextArea;
