import React, { useEffect } from "react";

const Input = ({ label, required=false, type = "text", placeholder, register, name, error, maxLength }) => {
  
  const inputId = `input_${Math.random().toString(36).substr(2, 9)}`;
  

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className="flex gap-1 text-primary font-semibold"
      >
        {label}
        {required && <span className="text-red text-md">*</span>}
      </label>

      <input
        {...register(name)}
        type={type}
        id={inputId}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full rounded border border-[#6F7070] p-2 bg-transparent  text-sm"
      />
      {<p className="text-rose-500">{error?.message}</p> }
    </div>
  );
}

export default Input;
