'use client';

import { Button, Field, HStack, Input, Stack, Steps } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

interface FormValues {
  jobTitle: string;
  company: string;
  yearsOfExperience: string;
}

const formSchema = z.object({
  jobTitle: z.string().min(2, { message: 'A job title is required' }),
  company: z.string().min(2, { message: 'A company name is required' }),
  yearsOfExperience: z
    .string()
    .min(1, { message: 'Provide your years of experience' }),
});

interface WorkInfoFormProps {
  onSubmit?: (data: FormValues) => void;
}

export function WorkInfo(props: WorkInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    props.onSubmit?.(data);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap='4'>
        <Field.Root invalid={!!errors.jobTitle}>
          <Field.Label>Job Title</Field.Label>
          <Input {...register('jobTitle')} />
          <Field.ErrorText>{errors.jobTitle?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.company}>
          <Field.Label>Company</Field.Label>
          <Input {...register('company')} />
          <Field.ErrorText>{errors.company?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.yearsOfExperience}>
          <Field.Label>Years of Experience</Field.Label>
          <Input {...register('yearsOfExperience')} />
          <Field.ErrorText>{errors.yearsOfExperience?.message}</Field.ErrorText>
        </Field.Root>

        <HStack gap='4'>
          <Steps.PrevTrigger asChild flex='1'>
            <Button variant='outline'>Previous</Button>
          </Steps.PrevTrigger>

          <Button type='submit' flex='1'>
            Next
          </Button>
        </HStack>
      </Stack>
    </form>
  );
}
