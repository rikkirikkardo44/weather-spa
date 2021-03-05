import React from "react";

import { Button, Form, Input } from "antd";

import { ApiKeyRequestFormProps } from "./ApiKeyRequestFormProps";

export const ApiKeyRequestForm: React.FC<ApiKeyRequestFormProps> = (props) => {
  const { onSubmit } = props;
  return (
    <Form
      className="api-key-form"
      onFinish={(value) => {
        onSubmit(value.apiKey);
      }}
    >
      <Form.Item name="apiKey">
        <Input placeholder="Введите ApiKey" />
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
};
