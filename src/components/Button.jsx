function Button({ children, color, type = "submit", onClick, className }) {
  let buttonClass =
    "flex gap-2 items-center py-2 rounded relative text-center justify-center text-md font-bold w-full";

  if (color === "primary") {
    buttonClass += " bg-primary text-white";
  } else if (color === "secondary") {
    buttonClass += " bg-secondary text-black";
  } else if (color === "white") {
    buttonClass += " bg-white border border-[#6F7070] text-text-color";
  }
  buttonClass += className ? ` ${className}` : "";

  const eventHandler = (e) => {
    e.preventDefault();
    onClick(1);
  };

  return (
    <button
      className={buttonClass}
      color={color}
      onClick={eventHandler}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
