/* eslint-disable react/prop-types */
function Input({ name, placeholder, error, onFocus, onChange, onBlur, value }) {
  return (
    <div className="relative flex flex-col gap-1">
      <input
        name={name}
        placeholder={placeholder}
        className={`w-full border-b-[1px] bg-gray p-4 caret-primary outline-none placeholder:opacity-60 ${error ? "border-primary border-opacity-60" : "border-secondary"} focus:border-white`}
        onFocus={onFocus}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      {error && (
        <p className="absolute right-0 top-1/2 translate-y-[-50%] text-sm text-primary opacity-50">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
