import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Menu, { MenuButton, MenuItem, MenuList } from 'Menu';
import { MdPhotoCamera } from 'react-icons/md';

export default {
  //https://storybook.js.org/docs/react/essentials/controls#annotation
  title: 'Components/Menu',
  component: Menu,
  argTypes: {
    // variant: {
    //   options: peppersMenuVariant,
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
} as ComponentMeta<typeof Menu>;
const PlaygroundTemplate: ComponentStory<typeof Menu> = (args) => {
  return (
    <Menu {...args}>
      <MenuButton>Test</MenuButton>
      <MenuList>
        <MenuItem
          onSelect={() => {
            console.log('select');
          }}
          classes="p-1"
        >
          MenuItem1
        </MenuItem>
        <MenuItem classes="p-1">
          <MdPhotoCamera />
          MenuItem2
        </MenuItem>
        <MenuItem classes="p-1">MenuItem3</MenuItem>
        <MenuItem classes="p-1">MenuItem4</MenuItem>
      </MenuList>
    </Menu>
  );
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
