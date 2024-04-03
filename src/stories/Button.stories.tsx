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
