import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import IconButton from 'IconButton';
import { MdPhotoCamera } from 'react-icons/md';

export default {
  //https://storybook.js.org/docs/react/essentials/controls#annotation
  title: 'Components/IconButton',
  component: IconButton,
  argTypes: {
    // variant: {
    //   options: peppersIconButtonVariant,
    //   control: { type: 'inline-radio' },
    // },
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'inline-radio' },
    },
    variant: {
      options: ['circle', 'square'],
      control: { type: 'inline-radio' },
    },
    color: {
      options: ['default', 'primary', 'secondary'],
      control: {
        type: 'select',
      },
    },
  },
} as ComponentMeta<typeof IconButton>;
const PlaygroundTemplate: ComponentStory<typeof IconButton> = (args) => {
  return (
    <IconButton {...args}>
      <MdPhotoCamera />
    </IconButton>
  );
};
export const Playground = PlaygroundTemplate.bind({});
Playground.storyName = '@Playground';
Playground.args = {
  size: 'medium',
  variant: 'square',
  color: 'default',
};
Playground.parameters = {
  controls: {
    disabled: false,
  },
};
