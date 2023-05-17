import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from './index';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  ///https://storybook.js.org/docs/react/essentials/controls#annotation
  title: 'Components/Stack',
  component: Button,
} as ComponentMeta<typeof Button>;

const PlaygroundTemplate: ComponentStory<typeof Button> = (args) => <Button {...args} />;
export const Playground = PlaygroundTemplate.bind({
  argTypes: {
    variant: {
      options: ['contained', 'outlined', 'text'],
      control: { type: 'inline-radio' },
    },
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'inline-radio' },
    },
  },
});
Playground.args = {
  children: 'Playground',
};
