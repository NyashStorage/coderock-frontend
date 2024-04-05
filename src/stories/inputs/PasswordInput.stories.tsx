import type { Meta, StoryFn } from '@storybook/react';

import { PasswordInput } from '../../components/inputs/PasswordInput';

export default {
  title: 'Inputs/PasswordInput',
  component: PasswordInput,
  argTypes: {},
} as Meta<typeof PasswordInput>;

const Template: StoryFn<typeof PasswordInput> = (args) => (
  <PasswordInput {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
