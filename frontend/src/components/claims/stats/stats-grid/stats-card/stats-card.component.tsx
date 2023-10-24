import { Stats } from "../../../../../domain/entities/stats.entities";

type Props = {
  stats: Stats;
};

const StatsCard = ({ stats }: Props) => {
  const { name, value, Icon } = stats;

  return (
    <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-900 text-gray-100">
      <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-400">
        <Icon className="h-9 w-9 text-gray-800" />
      </div>
      <div className="flex flex-col justify-center align-middle">
        <p className="text-3xl font-semibold leading-none">{value}</p>
        <p className="capitalize">{name}</p>
      </div>
    </div>
  );
};

export default StatsCard;
