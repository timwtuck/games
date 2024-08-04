type Props = {
  className?: string;
  handleClick: () => void;
  text: string;
};

function Button({ className = undefined, text, handleClick }: Props) {
  return (
    <button
      className={`font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ${className}`}
      type="button"
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

export default Button;
