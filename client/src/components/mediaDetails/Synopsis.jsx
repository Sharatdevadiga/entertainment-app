/* eslint-disable react/prop-types */
function Synopsis({ overview }) {
  return (
    <div className="space-y-1">
      <p>Synopsis</p>
      <p className="text-body-s">{overview}</p>
    </div>
  );
}

export default Synopsis;
