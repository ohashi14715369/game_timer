import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store";
import * as SoundModule from "../modules/Sound";

function SoundManagerComponent() {
  const { soundBuffers } = useSelector((state: RootState) => state.sound);
  const dispatch = useDispatch();
  const load = (name: string, blob: Blob) => dispatch(SoundModule.load(name, blob));
  return <div></div>;
}
export default SoundManagerComponent;
