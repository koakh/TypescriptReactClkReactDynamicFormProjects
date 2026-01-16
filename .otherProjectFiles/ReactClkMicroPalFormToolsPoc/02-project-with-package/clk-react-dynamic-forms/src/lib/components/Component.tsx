import React from "react";
import { useForm } from "react-hook-form";
import { Tool } from "../interfaces";
import { Alert } from "@mui/material";

const Component: React.FC = (): JSX.Element => {
  // const {
  //   control,
  //   register,
  //   handleSubmit,
  //   reset,
  //   watch,
  //   setValue,
  //   formState: { errors },
  // } = useForm();

  return (<div>
    <Alert severity="error" icon={false} style={{ marginTop: 10, marginBottom: 10, padding: 0 }}>
      <ul style={{ margin: 0, paddingLeft: '1.75em' }}><li>'error</li></ul>
    </Alert>
  </div>);
};

export default Component;