import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

export type IAuthFormProps = {
  setOnRegister: Dispatch<SetStateAction<boolean>>;
}