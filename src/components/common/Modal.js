import React from "react";
import ModalPortal from "./ModalPortal";
import UIKit from "uikit/dist/js/uikit.min.js";

export const showModal = (modalID) => {
  UIKit.modal(`#${modalID}`).show();
};

export const hideModal = (modalID) => {
  UIKit.modal(`#${modalID}`).hide();
};

const Modal = ({
  modalID,
  title,
  description,
  onSave = () => {},
  children,
}) => {
  return (
    <ModalPortal modalID={modalID}>
      <div className="uk-modal-dialog uk-modal-body">
        {title ? <h2 className="uk-modal-title">{title}</h2> : null}
        {description ? <p>{description}</p> : null}
        {children}
        <p className="uk-text-right">
          <button
            className="uk-button uk-button-default uk-modal-close"
            type="button"
          >
            Huỷ bỏ
          </button>
          <button
            className="uk-button uk-button-primary uk-margin-left"
            type="button"
            onClick={onSave}
          >
            Chọn
          </button>
        </p>
      </div>
    </ModalPortal>
  );
};

export default Modal;
