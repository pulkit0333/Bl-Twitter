import { useEffect, useState } from "react";
import ProfileHeader from "../components/profile/profile-header/profile-header.component";
import { selectUser } from "../store/slices/user.sllice";
import { DataFetchState } from "../domain/entities/data-fetch-state.entity";
import { NFT } from "../domain/entities/nft.entity";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Unsubscribe } from "@reduxjs/toolkit";
import { db } from "../utils/firebase";
import { useSelector } from "react-redux";
import OwnNftsGrid from "../components/profile/nfts-grid/own-nfts-grid.component";

const MyProfilePage = () => {
  const user = useSelector(selectUser);

  const [nfts, setNfts] = useState<DataFetchState<NFT[]>>({
    loading: false,
    data: [],
  });

  useEffect(() => {
    let unsubscribe: Unsubscribe;

    setNfts({ loading: true, data: [] });

    if (user) {
      unsubscribe = onSnapshot(
        query(collection(db, "nfts"), where("owner", "==", user.address)),
        (snapshot) => {
          const nfts: NFT[] = [];

          snapshot.forEach((doc) => {
            return nfts.push(doc.data() as NFT);
          });

          setNfts({ loading: false, data: nfts });
        }
      );
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <div className="w-full space-y-10 max-h-screen p-10 overflow-scroll scrollbar-none">
      {user ? <ProfileHeader user={user} /> : "loading..."}
      <OwnNftsGrid nfts={nfts} />
    </div>
  );
};

export default MyProfilePage;
