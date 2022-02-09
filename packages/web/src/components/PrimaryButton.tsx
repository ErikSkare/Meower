import React from "react";
import {PulseLoader} from "react-spinners";

type PrimaryButtonProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  isLoading?: boolean;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  isLoading = false,
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`bg-sky-400 text-white font-bold py-3 px-10 rounded hover:bg-sky-500 disabled:opacity-60 ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <PulseLoader color="white" margin="0" /> : <>{children}</>}
    </button>
  );
};

export default PrimaryButton;
