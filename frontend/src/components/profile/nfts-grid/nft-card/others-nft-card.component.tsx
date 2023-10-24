import { NFT } from "../../../../domain/entities/nft.entity";
import ipfsPreviewGenerator from "../../../../utils/ipftPreviewGenerator";
import { useAppDispatch } from "../../../../store/hooks";
import { toggleOthersNFTModalOpen } from "../../../../store/slices/profile.silce";

type Props = {
  nft: NFT;
};

const OthersNftCard = ({ nft }: Props) => {
  const { name, description, image } = nft;
  const dispatch = useAppDispatch();

  const openNftModal = () => {
    dispatch(toggleOthersNFTModalOpen(nft));
  };

  return (
    <div
      onClick={openNftModal}
      className="flex flex-col cursor-pointer items-center border rounded-lg shadow md:max-w-xl border-gray-700 bg-gray-800 hover:bg-gray-700"
    >
      <img
        className="object-cover w-full h-full md:rounded-none"
        src={ipfsPreviewGenerator(image)}
        alt={name}
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
          {name}
        </h5>
        <p className="mb-3 font-normal text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default OthersNftCard;
