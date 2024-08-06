/* eslint-disable react/prop-types */
function OverLay({ className }) {
  return (
    <div
      className={`${className} absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-stone-950`}
    ></div>
  );
}

export default OverLay;
