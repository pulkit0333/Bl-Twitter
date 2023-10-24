import { DataFetchState } from "../../../domain/entities/data-fetch-state.entity";
import { NFT } from "../../../domain/entities/nft.entity";
import ErrorComponent from "../../common/error-component/error.component";
import OthersNftCard from "./nft-card/others-nft-card.component";

type Props = {
  nfts: DataFetchState<NFT[]>;
};

const OthersNftsGrid = ({ nfts }: Props) => {
  if (nfts.error) return <ErrorComponent error={nfts.error} />;
  if (!nfts.data || nfts.loading)
    return <div className="text-white">Loading nfts</div>;
  if (nfts.data.length === 0)
    return <div className="text-white">No nfts found</div>;

  return (
    <div className="grid grid-cols-3 gap-6">
      {nfts.data.map((nft, idx) => (
        <OthersNftCard key={idx} nft={nft} />
      ))}
    </div>
  );
};

export default OthersNftsGrid;
