import type { Meta, StoryFn } from '@storybook/react';

import TextField from '@mui/material/TextField';

export default {
  title: 'Inputs/Input',
  component: TextField,
  argTypes: {},
} as Meta<typeof TextField>;

const Template: StoryFn<typeof TextField> = (args) => (
  <TextField {...args}>Hello world</TextField>
);

export const Primary = Template.bind({});
Primary.args = {};
