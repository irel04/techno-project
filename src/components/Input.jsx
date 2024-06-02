import React from "react";
import { useForm } from "react-hook-form";


const Input = ({ label, type = "text", placeholder, required = false, onChange, name, maxLength }) => {
  
  const inputId = `input_${Math.random().toString(36).substr(2, 9)}`;
  const { register } = useForm()

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
        {...register(name), {required: required, maxLength: maxLength}}
        type={type}
        id={inputId}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-[#6F7070] p-2 bg-transparent  text-sm"
      />
    </div>
  );
}

export default Input;
