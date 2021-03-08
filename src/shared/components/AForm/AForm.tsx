import React, { useCallback } from "react";

import { Button, Form, Input } from "antd";

import { AFormProps } from "./AFormProps";

export const AForm: React.FC<AFormProps> = React.memo((props) => {
  const { placeholder, onSubmit, ...restProps } = props;

  const onFinish = useCallback((value: any) => {
    onSubmit(value.inputValue);
  }, [onSubmit]);

  return (
    <Form
      className="aform"
      autoComplete="off"
      onFinish={onFinish}
      {...restProps}
    >
      <Form.Item name="inputValue">
        <Input placeholder={placeholder || "Введите"} />
      </Form.Item>
      <Form.Item>
        <div className="footer">
          <Button className="confirm-button" type="primary" htmlType="submit">
            Сохранить
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
});
