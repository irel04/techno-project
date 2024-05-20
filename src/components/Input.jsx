import React from "react";

function Input({
  label,
  type = "text",
  placeholder,
  required = false,
  onChange,
}) {
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
        type={type}
        id={inputId}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-[#6F7070] p-2 bg-transparent placeholder-secondary text-sm"
      />
    </div>
  );
}

export default Input;
