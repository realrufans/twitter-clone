import { atom } from "recoil";

export const openModal = atom({
  key: "openModal", // all the atoms in recoil have their unique key
  default: false, // this is the default value of an atom
});

export const deleteModal = atom({
  key: "deleteModal", // all the atoms in recoil have their unique key
  default: false, // this is the default value of an atom
});
export const subdeleteModal = atom({
  key: "subdeleteModal", // all the atoms in recoil have their unique key
  default: false, // this is the default value of an atom
});

export const postIdState = atom({
  key: "postIdState",
  default: "",
});
