type ButtonProps = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  fullWidth?: boolean;
};

function Button({
  text,
  onClick,
  type = "button",
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${fullWidth ? "w-full" : ""}
        rounded-lg
        px-6
        py-3
        font-semibold
        transition
        duration-200
        whitespace-nowrap
        ${
          disabled
            ? "cursor-not-allowed bg-gray-300 text-gray-500"
            : "bg-green-600 text-white hover:bg-green-700"
        }
      `}
    >
      {text}
    </button>
  );
}

export default Button;