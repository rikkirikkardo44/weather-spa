import { Modal, ModalFuncProps } from "antd";

const { confirm } = Modal;

export function showCustomModal(modalConfig: ModalFuncProps) {
  confirm({
    okButtonProps: { className: "confirm-button" },
    cancelButtonProps: { className: "cancel-button" },
    icon: null,
    closable: true,
    ...modalConfig,
  });
}
