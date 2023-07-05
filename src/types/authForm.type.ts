import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

export type IAuthFormProps = {
  setOnLogin: Dispatch<SetStateAction<boolean>>;
}