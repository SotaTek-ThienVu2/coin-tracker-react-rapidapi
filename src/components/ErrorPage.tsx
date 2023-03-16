import { Result } from "antd";
import React from "react";

interface ErrorPageProps{
    error: any;
    extra: React.ReactNode
}

export const ErrorPage = (props: ErrorPageProps) => {

  return (
    <Result
      status={props.error.status}
      title={props.error.status}
      subTitle={props.error.data.message}
      extra={
        props.extra
      }
    />
  );
};
