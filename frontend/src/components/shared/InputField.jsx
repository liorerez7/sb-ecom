// const InputField = ({
//   label,
//   id,
//   type = "text",
//   errors,
//   register,
//   required,
//   message,
//   className,
//   min,
//   value,
//   placeholder,
//   rules, // NEW: מאפשר העברת חוקים מותאמים
// }) => {
//   // בסיס כללי ולידציה
//   const baseRules = {
//     ...(required ? { required: { value: true, message: message || `${label} is required` } } : {}),
//     ...(min ? { minLength: { value: min, message: `Minimum ${min} characters is required` } } : {}),
//   };

//   // חוקים מובנים לפי type (email/url)
//   const typeRules =
//     type === "email"
//       ? {
//           pattern: {
//             value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//             message: "Invalid email address",
//           },
//         }
//       : type === "url"
//       ? {
//           pattern: {
//             value:
//               /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
//             message: "Invalid URL",
//           },
//         }
//       : {};

//   // מיזוג: base + type + rules (העדפה לכללים שב־rules)
//   const finalRules = { ...baseRules, ...typeRules, ...(rules || {}) };

//   return (
//     <div className="flex flex-col gap-1 w-full">
//       <label
//         htmlFor={id}
//         className={`${className ? className : ""} text-slate-800 font-semibold text-sm`}
//       >
//         {label}
//       </label>

//       <input
//         type={type}
//         id={id}
//         placeholder={placeholder}
//         className={`${className ? className : ""} 
//           px-2 py-2 border outline-none bg-white text-slate-800 rounded
//           ${errors?.[id]?.message ? "border-red-500" : "border-slate-300"}`}
//         {...register(id, finalRules)}
//       />

//       {errors?.[id]?.message && (
//         <p className="text-sm font-semibold text-red-600 mt-1">
//           {errors[id].message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default InputField;

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
                htmlFor="id"
                className={`${
                    className ? className : ""
                } font-semibold text-sm text-slate-800`}>
                {label}
            </label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className={`${
                    className ? className : ""
                } px-2 py-2 border outline-hidden bg-transparent text-slate-800 rounded-md ${
                    errors[id]?.message ? "border-red-500" : "border-slate-700" 
                }`}
                {...register(id, {
                    required: {value: required, message},
                    minLength: min
                        ? { value: min, message: `Minimum ${min} character is required`}
                        : null,
                    pattern:
                        type === "email"
                            ? {
                                value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+com+$/,
                                message: "Invalid email"
                            }
                            : type === "url"
                            ? {
                                value: /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                                message: "Please enter a valid url"
                            }
                            : null,

                })}
                />

                {errors[id]?.message && (
                    <p className="text-sm font-semibold text-red-600 mt-0">
                        {errors[id]?.message}
                    </p>
                )}
        </div>
    );
};

export default InputField;