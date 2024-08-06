/* eslint-disable react/prop-types */
function LinkButton({ link, children }) {
  return (
    <a
      className="flex w-24 items-center justify-center gap-2 rounded-md bg-blue-500 px-2 py-1.5 text-body-s transition-all hover:scale-105 active:scale-95"
      href={link}
      target="_blank"
      rel="noopner noreferer"
    >
      {children}
    </a>
  );
}

export default LinkButton;
