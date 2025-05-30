import type { ChangeEventHandler } from "react";

type FieldProps = {
  type?: "text" | "password" | "email";
  name?: string;
  value?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler;
};

function TextField({
  type = "text",
  name,
  value,
  placeholder,
  onChange,
}: FieldProps) {
  return (
    <input
      name={name}
      type={type}
      value={value}
      className="border-1 border-gray-300 rounded-full px-6 py-4 font-display"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

export default TextField;
