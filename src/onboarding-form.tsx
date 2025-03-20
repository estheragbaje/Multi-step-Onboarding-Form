'use client';

import { Box, Heading, Steps } from '@chakra-ui/react';
import { PersonalInfo } from './personal-info';
import { WorkInfo } from './work-info';
import { MoreDetails } from './more-details';
import { useState } from 'react';

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
  const [step, setStep] = useState(0);

  const goToNextStep = () => {
    setStep(step + 1);
  };

  return (
    <Box padding={5} maxW='560px' mx='auto'>
      <Heading mb='4' textAlign='center'>
        Onboarding Form
      </Heading>

      <Steps.Root
        step={step}
        onStepChange={(e) => setStep(e.step)}
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
