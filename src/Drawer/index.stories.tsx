import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Drawer from 'Drawer';
import { MdPhotoCamera } from 'react-icons/md';

export default {
  //https://storybook.js.org/docs/react/essentials/controls#annotation
  title: 'Components/Drawer',
  component: Drawer,
  argTypes: {
    // variant: {
    //   options: peppersDrawerVariant,
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
} as ComponentMeta<typeof Drawer>;
const PlaygroundTemplate: ComponentStory<typeof Drawer> = (args) => {
  return <Drawer {...args} id="playground" />;
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
