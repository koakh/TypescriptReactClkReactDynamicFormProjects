import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';

interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
}

export const MyForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400 }}>
      <TextField
        fullWidth
        margin="normal"
        label="First Name"
        {...register("firstName", { required: "First name is required" })}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Last Name"
        {...register("lastName", { required: "Last name is required" })}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address"
          }
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};