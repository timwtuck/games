import DataTable from "react-data-table-component";
import { SolitareLeaderInfo } from "./SolitaireLeaderBoard";

type Props = { data: SolitareLeaderInfo[] };

function LeaderBoard({ data }: Props) {
  const columns = [
    {
      name: "time",
      selector: (row: SolitareLeaderInfo) => row.time,
    },
    {
      name: "Name",
      selector: (row: SolitareLeaderInfo) => row.name,
    },
    {
      name: "Inspirational Message",
      selector: (row: SolitareLeaderInfo) => row.message,
    },
  ];

  return <DataTable columns={columns} data={data} />;
}

export default LeaderBoard;
