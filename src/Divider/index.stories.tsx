import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Divider from 'Divider';
import { MdPhotoCamera } from 'react-icons/md';

export default {
  //https://storybook.js.org/docs/react/essentials/controls#annotation
  title: 'Components/Divider',
  component: Divider,
  argTypes: {
    // variant: {
    //   options: peppersDividerVariant,
    //   control: { type: 'inline-radio' },
    // },
    // size: {
    //   options: ['large', 'medium', 'small'],
    //   control: { type: 'inline-radio' },
    // },
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
} as ComponentMeta<typeof Divider>;
const PlaygroundTemplate: ComponentStory<typeof Divider> = (args) => {
  return <Divider {...args} style={{ width: 200 }} />;
};
export const Playground = PlaygroundTemplate.bind({});
Playground.storyName = '@Playground';
Playground.args = {
  // size: 'medium',
  // variant: 'square',
  // color: 'default',
  // disabled: false,
};
Playground.parameters = {
  controls: {
    disabled: false,
  },
};
