import { useEffect, useState } from "react";
import UserStats from "../components/claims/stats/stats.component";
import NftsGrid from "../components/claims/nfts-grid/nfts-grid.component";
import {
  Unsubscribe,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { NFT } from "../domain/entities/nft.entity";
import { DataFetchState } from "../domain/entities/data-fetch-state.entity";

type Props = {};

const ClaimsPage = (props: Props) => {
  const [nfts, setNfts] = useState<DataFetchState<NFT[]>>({
    loading: false,
    data: [],
  });

  useEffect(() => {
    let unsubscribe: Unsubscribe;

    setNfts({ loading: true, data: [] });

    unsubscribe = onSnapshot(
      query(collection(db, "nfts"), where("owner", "==", null)),
      (snapshot) => {
        const nfts: NFT[] = [];

        snapshot.forEach((doc) => {
          return nfts.push({ ...doc.data(), id: doc.id } as NFT);
        });

        setNfts({ loading: false, data: nfts });
      }
    );

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <div className="w-full space-y-10 max-h-screen p-10 overflow-scroll scrollbar-none">
      <UserStats />
      <NftsGrid nfts={nfts} />
    </div>
  );
};

export default ClaimsPage;
