import { useState } from "react";
import { useEffect } from "react";

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://api.themoviedb.org/3/movie/now_playing?api_key=71ca9d7b191fb64e1be0a9925148e929";
      const data = await getData(url);
      setData(data);
    };

    fetchData();
  }, []);

  console.log(data);
  return <div>Entertainment app</div>;
}

export default App;
