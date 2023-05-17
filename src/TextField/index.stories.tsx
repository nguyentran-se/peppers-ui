import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import TextField from 'TextField';
import { MdPhotoCamera } from 'react-icons/md';

export default {
  //https://storybook.js.org/docs/react/essentials/controls#annotation
  title: 'Components/TextField',
  component: TextField,
  argTypes: {
    // variant: {
    //   options: peppersTextFieldVariant,
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
} as ComponentMeta<typeof TextField>;
const PlaygroundTemplate: ComponentStory<typeof TextField> = (args) => {
  return <TextField {...args} id="playground" label="Playground" defaultValue="test" />;
};
export const Playground = PlaygroundTemplate.bind({});
Playground.storyName = '@Playground';
Playground.args = {
  // size: 'medium',
  // variant: 'square',
  // color: 'default',
  disabled: false,
};
Playground.parameters = {
  controls: {
    disabled: false,
  },
};
