const InputField = ({
  label,
  id,
  type,
  errors,
  register,
  required,
  message,
  className,
  min,
  value,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor={id}
        className={`${className ? className : ""} text-slate-800 font-semibold text-sm`}
      >
        {label}
      </label>

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`${className ? className : ""} 
          px-2 py-2 border outline-none bg-white text-slate-800 rounded
          ${errors[id]?.message ? "border-red-500" : "border-slate-300"}`}
        {...register(id, {
          required: { value: required, message: message },
          minLength: min
            ? { value: min, message: `Minimum ${min} characters is required` }
            : undefined,
          pattern:
            type === "email"
              ? {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                }
              : type === "url"
              ? {
                  value:
                    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                  message: "Invalid URL",
                }
              : undefined,
        })}
      />

      {errors[id]?.message && (
        <p className="text-sm font-semibold text-red-600 mt-1">
          {errors[id]?.message}
        </p>
      )}
    </div>
  );
};

export default InputField;
