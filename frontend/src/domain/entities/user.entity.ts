export interface UserBase {
  description: string | null;
  image: string | null;
  level: number;
}

export interface User extends UserBase {
  address: `0x${string}`;
}

export interface UserStatus {
  totalLikesReceived: BigInt;
  totalCommentsReceived: BigInt;
}
