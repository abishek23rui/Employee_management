import { Controller } from "react-hook-form";

interface OptionType {
  label: string;
  value: string;
}

interface FormFieldProps {
  name: string;
  label?: string;
  type?: "input" | "select" | "date";
  control: any;
  placeholder?: string;
  options?: OptionType[];
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  isRequired?: boolean;
}

function FormField({
  name,
  label,
  type = "input",
  control,
  placeholder,
  options = [],
  error,
  disabled = false,
  readOnly = false,
  isRequired = false,
}: FormFieldProps) {
  // Base input classes with visible border
  const baseInputClasses = `
    ui-outlined-input 
    w-full 
    px-3 
    py-2 
    rounded-md 
    border
    border-gray-300
    bg-white
    transition-colors
    duration-200
    focus:outline-none 
    focus:ring-2 
    focus:ring-blue-500 
    focus:border-blue-500
    disabled:bg-gray-100 
    disabled:cursor-not-allowed
    ${readOnly ? 'bg-gray-50 cursor-default' : ''}
    ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={`w-full ui-outlined-wrapper ${error ? "ui-error" : ""}`}>
      {label && (
        <label className="flex items-center text-sm font-medium ui-outlined-label mb-1.5">
          {label}
          {isRequired && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          switch (type) {
            case "select":
              return (
                <select
                  {...field}
                  disabled={disabled}
                  className={baseInputClasses}
                >
                  <option value="">{placeholder || "Select..."}</option>
                  {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              );

            case "date":
              return (
                <input
                  {...field}
                  type="date"
                  disabled={disabled}
                  readOnly={readOnly}
                  className={baseInputClasses}
                />
              );

            default:
              return (
                <input
                  {...field}
                  type="text"
                  placeholder={placeholder}
                  disabled={disabled}
                  readOnly={readOnly}
                  className={baseInputClasses}
                />
              );
          }
        }}
      />

      {error && (
        <p className="text-sm text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;