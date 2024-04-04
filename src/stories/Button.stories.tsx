import type { Meta, StoryFn } from '@storybook/react';

import Button from '@mui/material/Button';

export default {
  title: 'Button',
  component: Button,
  argTypes: {},
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => (
  <Button {...args}>Hello world</Button>
);

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
  variant: 'contained',
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: 'secondary',
  variant: 'contained',
};

// TODO: Вынести как отдельный компонент.
export const SecondaryLight = Template.bind({});
SecondaryLight.args = {
  sx: {
    color: 'primary.main',
    bgcolor: 'secondary.light',
  },
  variant: 'contained',
};
