'use client';

import { Box, Heading, Steps } from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MoreDetails } from './more-details';
import { PersonalInfo } from './personal-info';
import { WorkInfo } from './work-info';

const steps = [
  { title: 'Personal Info', id: 'personal-info' },
  {
    title: 'Work Info',
    id: 'work-info',
  },
  {
    title: 'More Details',
    id: 'more-details',
  },
];

export function OnboardingForm() {
  const searchParams = useSearchParams();
  const stepId = searchParams.get('step');

  let step = steps.findIndex((step) => step.id === stepId);
  if (step === -1) step = 0;
  if (stepId === 'done') step = steps.length;

  const router = useRouter();

  const goToNextStep = () => {
    const nextStep = steps[step + 1];
    router.push(`?step=${nextStep?.id ?? 'done'}`);
  };

  const goToStep = (step: number) => {
    const nextStep = steps[step];
    if (nextStep) {
      router.push(`?step=${nextStep.id}`);
    }
  };

  return (
    <Box padding={5} maxW='560px' mx='auto'>
      <Heading mb='4' textAlign='center'>
        Onboarding Form
      </Heading>

      <Steps.Root
        step={step}
        onStepChange={(e) => goToStep(e.step)}
        count={steps.length}
      >
        <Steps.List>
          {steps.map((step, index) => (
            <Steps.Item key={index} index={index} title={step.title}>
              <Steps.Indicator />
              <Steps.Title>{step.title}</Steps.Title>
              <Steps.Separator />
            </Steps.Item>
          ))}
        </Steps.List>

        <Steps.Content index={0}>
          <PersonalInfo
            onSubmit={(data) => {
              goToNextStep();
              console.log(data);
            }}
          />
        </Steps.Content>

        <Steps.Content index={1}>
          <WorkInfo
            onSubmit={(data) => {
              goToNextStep();
              console.log(data);
            }}
          />
        </Steps.Content>

        <Steps.Content index={2}>
          <MoreDetails
            onSubmit={(data) => {
              goToNextStep();
              console.log(data);
            }}
          />
        </Steps.Content>

        <Steps.CompletedContent>
          Thank you for completing your onboarding
        </Steps.CompletedContent>
      </Steps.Root>
    </Box>
  );
}
