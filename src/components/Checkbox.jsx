function Checkbox({ label, checked, onChange }) {
  const handleCheckboxChange = () => {
    onChange(!checked);
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        className="form-checkbox h-3 w-3 text-primary"
      />
      <span className="ml-2">{label}</span>
    </label>
  );
}

export default Checkbox;
