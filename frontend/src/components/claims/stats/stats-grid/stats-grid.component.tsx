import { Stats } from "../../../../domain/entities/stats.entities";
import StatsCard from "./stats-card/stats-card.component";

type Props = {
  stats: Stats[];
};

const StatsGrid = ({ stats }: Props) => {
  return (
    <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat, idx) => (
        <StatsCard key={idx} stats={stat} />
      ))}
    </div>
  );
};

export default StatsGrid;
