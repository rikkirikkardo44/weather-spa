import React from "react";

import { Modal } from "antd";

import { AModalProps } from "./AModalProps";

export const AModal: React.FC<AModalProps> = React.memo((props) => {
  const { visible, children, ...restProps  } = props;
  return (
    <Modal
      visible={visible}
      footer={null}
      closable={true}
      {...restProps}
    >
      {children}
    </Modal>
  )
});
