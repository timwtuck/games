import LeaderBoard from "./LeaderBoard";
import app from "../firebase/firebase.js";
import { getDatabase, ref, get } from "firebase/database";
import { useEffect, useState } from "react";

type Props = {};
export type SolitareLeaderInfo = {
  name: string;
  message: string;
  time: string;
};

function SolitaireLeaderBoard({}: Props) {
  const [data, setData] = useState<SolitareLeaderInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, "solitaire");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const leaders = Object.values(snapshot.val()) as SolitareLeaderInfo[];
        setData(leaders);
      }
    };

    fetchData();
  }, []);

  return <LeaderBoard data={data} />;
}

export default SolitaireLeaderBoard;
