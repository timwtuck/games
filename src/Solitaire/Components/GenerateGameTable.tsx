import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateSeed } from "../Utils/utils";

function GenerateGameTable() {
  let navigate = useNavigate();

  useEffect(() => {
    const genSeed = generateSeed();
    navigate("/solitaire/" + genSeed);
  }, []);

  return <h1>Loading...</h1>;
}

export default GenerateGameTable;
