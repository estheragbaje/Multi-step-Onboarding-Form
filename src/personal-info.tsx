'use client';

import { Button, Field, Input, Stack } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface FormValues {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
}

const formSchema = z.object({
  firstName: z.string().min(1, { message: 'Please enter your first name' }),
  lastName: z.string().min(1, { message: 'Please enter your last name' }),
  emailAddress: z.string().email(),
  phoneNumber: z
    .string()
    .min(10, { message: 'Please enter a valid phone number' }),
});

interface PersonalInfoFormProps {
  onSubmit?: (data: FormValues) => void;
}
export function PersonalInfo(props: PersonalInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    props.onSubmit?.(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap='4'>
        <Field.Root invalid={!!errors.firstName}>
          <Field.Label>First Name</Field.Label>
          <Input {...register('firstName')} />
          <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.lastName}>
          <Field.Label>Last Name</Field.Label>
          <Input {...register('lastName')} />
          <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.emailAddress}>
          <Field.Label>Email Address</Field.Label>
          <Input type='email' {...register('emailAddress')} />
          <Field.ErrorText>{errors.emailAddress?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.phoneNumber}>
          <Field.Label>Phone Number</Field.Label>
          <Input {...register('phoneNumber')} />
          <Field.ErrorText>{errors.phoneNumber?.message}</Field.ErrorText>
        </Field.Root>

        <Button type='submit'>Next</Button>
      </Stack>
    </form>
  );
}
