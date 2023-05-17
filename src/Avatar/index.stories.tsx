import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Avatar from 'Avatar';
import { MdPhotoCamera } from 'react-icons/md';

export default {
  //https://storybook.js.org/docs/react/essentials/controls#annotation
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    // variant: {
    //   options: peppersAvatarVariant,
    //   control: { type: 'inline-radio' },
    // },
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'inline-radio' },
    },
    as: {
      description: 'HTML tag name',
    },
    // variant: {
    //   options: ['circle', 'square'],
    //   control: { type: 'inline-radio' },
    // },
    // color: {
    //   options: ['default', 'primary', 'secondary'],
    //   control: {
    //     type: 'select',
    //   },
    // },
  },
} as ComponentMeta<typeof Avatar>;
const PlaygroundTemplate: ComponentStory<typeof Avatar> = (args) => {
  return <Avatar {...args} />;
};
export const Playground = PlaygroundTemplate.bind({});
Playground.storyName = '@Playground';
Playground.args = {
  size: 'medium',
  as: 'div',
  children: '',
  // variant: 'square',
  // color: 'default',
  // disabled: false,
};
Playground.parameters = {
  controls: {
    disabled: false,
  },
};

export const LetterAvatar = PlaygroundTemplate.bind({});
LetterAvatar.storyName = 'LetterAvatar';
LetterAvatar.args = {
  size: 'medium',
  children: 'Nguyen',
};
