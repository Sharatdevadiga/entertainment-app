export function formateMediagData(dataSet, mediaType) {
  let res = [];
  dataSet.forEach((data) => res.push(formateData(data, mediaType)));
  return res;

  function formateData(data, mediaType) {
    let foromatedData = {
      id: data.id,
      poster: data?.backdrop_path,
      title: data?.title || data?.name,
      type: data?.media_type || mediaType,
      adult: data.adult,
      date: data?.release_date || data?.first_air_date,
    };
    return foromatedData;
  }
}

export function randomSorter(arr1, arr2) {
  let merged = [...arr1, ...arr2];

  for (let i = 0; i < merged.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    [merged[i], merged[j]] = [merged[j], merged[i]];
  }
  return merged;
}

// export function extractUrl(data) {
//   const YOUTUBE_BASE_URL = "";
// }
