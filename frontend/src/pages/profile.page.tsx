import { useNavigate, useParams } from "react-router-dom";
import ProfileHeader from "../components/profile/profile-header/profile-header.component";
import { useEffect, useState } from "react";
import { User } from "../domain/entities/user.entity";
import { db } from "../utils/firebase";
import {
  Unsubscribe,
  collection,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { DataFetchState } from "../domain/entities/data-fetch-state.entity";
import { NFT } from "../domain/entities/nft.entity";
import OthersNftsGrid from "../components/profile/nfts-grid/others-nfts-grid.component";
import toast from "react-hot-toast";

type Props = {};

const OthersProfilePage = (props: Props) => {
  const params = useParams();

  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let unsubscribe: Unsubscribe;

    if (params && params.id) {
      const address = params.id;
      unsubscribe = onSnapshot(doc(db, "users", address), (userDoc) => {
        if (userDoc.exists()) {
          setUser({ ...userDoc.data(), address } as User);
        } else {
          toast.error("Profile not found!");
          navigate("/");
        }
      });
    }

    return () => {
      unsubscribe();
    };
  }, [params]);

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
  }, [user]);

  return (
    <div className="w-full space-y-10 max-h-screen p-10 overflow-scroll scrollbar-none">
      {user ? <ProfileHeader user={user} /> : "loading...."}
      <OthersNftsGrid nfts={nfts} />
    </div>
  );
};

export default OthersProfilePage;
