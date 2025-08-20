// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import InputField from "../shared/InputField";
// import { AiOutlineLogin } from "react-icons/ai";
// import { useDispatch } from "react-redux";
// import { authenticateSignInUser } from "../../store/actions";
// import { toast } from "react-hot-toast";

// const Login = () => {
//   const navigate = useNavigate();
//   const [loader, setLoader] = useState(false);
//   const dispatch = useDispatch();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     mode: "onTouched",
//   });

//   const loginHandler = async (data) => {
//     console.log("Login Click", data);
//     dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader));
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit(loginHandler)}
//         className="bg-white shadow-md rounded-lg p-6 w-full max-w-md flex flex-col gap-4"
//       >
//         <div className="flex items-center gap-2 mb-2">
//           <AiOutlineLogin className="text-blue-600 text-xl" />
//           <h1 className="text-lg font-bold text-slate-800">Login</h1>
//         </div>

//         <InputField
//           label="Username"
//           required
//           id="username"
//           type="text"
//           register={register}
//           errors={errors}
//           message="Username is required"
//           placeholder="Enter your username"
//         />

//         <InputField
//           label="Password"
//           required
//           id="password"
//           type="password"
//           register={register}
//           errors={errors}
//           message="Password is required"
//           placeholder="Enter your password"
//         />

//         <button
//           disabled={loader}
//           type="submit"
//           className="w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-gray-400"
//         >
//           {loader ? "Loading..." : "Login"}
//         </button>

//         <p className="text-sm text-slate-700 text-center">
//           Don&apos;t have an account?{" "}
//           <Link to="/register">
//             <span className="text-blue-600 hover:underline">Sign up</span>
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../shared/InputField";
import { AiOutlineLogin } from "react-icons/ai";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { authenticateSignInUser } from "../../store/actions";
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({ mode: "onTouched" });

  const loginHandler = async (data) => {
    setLoader(true);
    try {
      dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader));
    } finally {
      // setLoader is also controlled by the thunk
    }
  };

  const disabled = loader || isSubmitting;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Card */}
        <form
          onSubmit={handleSubmit(loginHandler)}
          className="relative rounded-2xl bg-white border border-slate-200 shadow-lg p-6 sm:p-8"
          aria-busy={disabled}
          aria-live="polite"
        >
          {/* Header */}
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 shadow">
              <AiOutlineLogin className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Welcome back
              </h1>
              <p className="text-sm text-slate-600">
                Sign in to continue to your account
              </p>
            </div>
          </div>

          {/* Username */}
          <InputField
            label="Username"
            required
            id="username"
            type="text"
            register={register}
            errors={errors}
            message="Username is required"
            placeholder="Enter your username"
            disabled={disabled}
          />

          {/* Password with toggle */}
          <div className="mt-4">
            <div className="relative">
              <InputField
                label="Password"
                required
                id="password"
                type={showPassword ? "text" : "password"}
                register={register}
                errors={errors}
                message="Password is required"
                placeholder="Enter your password"
                disabled={disabled}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-[38px] inline-flex items-center justify-center p-1.5 rounded-md text-slate-500 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
                disabled={disabled}
              >
                {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  disabled={disabled}
                />
                Remember me
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            disabled={disabled}
            type="submit"
            className="group relative mt-6 w-full overflow-hidden rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:from-slate-800 hover:to-slate-700 hover:shadow-xl active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {/* shimmer */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative inline-flex items-center justify-center gap-2">
              {disabled ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
                  Signing in...
                </span>
              ) : (
                <>
                  <AiOutlineLogin />
                  Sign in
                </>
              )}
            </span>
          </button>

          {/* Divider */}
          <div className="my-6 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          {/* Secondary actions */}
          <p className="text-sm text-slate-700 text-center">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-indigo-700 hover:underline">
              Sign up
            </Link>
          </p>

          {/* Trust indicators */}
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Secure authentication
            </span>
            <span className="h-3 w-px bg-slate-300" />
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Encrypted connection
            </span>
          </div>

          {/* Subtle loading overlay */}
          {disabled && (
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-white/40 backdrop-blur-[1px]" />
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
