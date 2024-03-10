import React, { FC, ReactNode } from "react";
import ReactDOM from "react-dom";
import stylesModalDetails from "./Modal.module.css";
import { CloseIcon } from "../../images/icons/CloseIcon";
import ModalOverlay from "./ModalOverlay/ModalOverlay";

const modalRoot = document.querySelector("#modal") as HTMLElement;

export type TModal = {
  active: boolean;
  setActive: (value: React.SetStateAction<boolean>) => void;
  children?: ReactNode;
};

const Modal: FC<TModal> = ({ active, setActive, children }) => {
  React.useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [active]);

  return ReactDOM.createPortal(
    <>
      <div
        className={
          active
            ? `${stylesModalDetails.container} ${stylesModalDetails.active}`
            : `${stylesModalDetails.container}`
        }
      >
        <button
          className={`${stylesModalDetails.close} mt-7 mr-5`}
          onClick={() => setActive(false)}
        >
          <CloseIcon strokeDefault="#000" />
        </button>
        {children}
      </div>
      <ModalOverlay active={active} setActive={() => setActive(false)} />
    </>,
    modalRoot
  );
};

export default React.memo(Modal);
