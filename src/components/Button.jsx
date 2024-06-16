function Button({ children, color, type = "submit", onClick=null, className, disabled=false }) {
  let buttonClass =
    "whitespace-nowrap px-4 flex gap-2 items-center py-2 rounded relative text-center justify-center text-md font-bold w-full";

  if (color === "primary") {
    buttonClass += " bg-primary text-white";
  } else if (color === "secondary") {
    buttonClass += " bg-secondary text-black";
  } else if (color === "white") {
    buttonClass += " bg-white border border-[#6F7070] text-text-color";
  } else if (color === "greyscale"){
    buttonClass += " bg-slate-500 text-slate-300"
  }
  buttonClass += className ? ` ${className}` : "";

  const eventHandler = (e) => {
    
    if(!onClick){
      return null
    }

    e.preventDefault();
    onClick(1);
  };

  return (
    <button
      className={buttonClass}
      // color={color}
      onClick={eventHandler}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
