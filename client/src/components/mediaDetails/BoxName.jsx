/* eslint-disable react/prop-types */
function BoxName({ type = "unfilled", children }) {
  return (
    <div
      className={`${type === "filled" ? "bg-blue-50 text-gray-dark" : ""} inline-block rounded-md border border-blue-50 px-1.5 py-0.5 text-body-s font-semibold`}
    >
      {children}
    </div>
  );
}

export default BoxName;
