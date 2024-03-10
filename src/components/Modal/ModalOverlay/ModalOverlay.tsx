import stylesModalOverlay from "./ModalOverlay.module.css";
import React, { FC } from "react";
import { TModal } from "../Modal";

const ModalOverlay: FC<TModal> = ({ active, setActive }) => {
  return (
    <div
      className={
        active
          ? `${stylesModalOverlay.popup} ${stylesModalOverlay.active}`
          : `${stylesModalOverlay.popup}`
      }
      onClick={() => setActive(false)}
    ></div>
  );
};

export default React.memo(ModalOverlay);
