export type User = {
  // required
  nick: string;
  orientation: string;
  dob: number;
  lastOnline: number;
  address: string;
  // optional
  position?: { lat: number; long: number };
  about?: string;
  height?: number;
  weight?: number;
  maritalStatus?: string;
  pics?: string[];
  socials?: string[];
};
