import { FormProps } from "antd";

export interface AFormProps extends FormProps {
  placeholder?: string;
  onSubmit: (value: string) => void;
}
