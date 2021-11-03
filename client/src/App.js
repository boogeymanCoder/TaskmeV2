import React from "react";
import axios from "axios";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    axios.get("/api/account/username/casoy").then((response) => {
      setData(response.data.address);
    });
  }, []);

  return <p>{!data ? "Loading..." : data}</p>;
}

export default App;
