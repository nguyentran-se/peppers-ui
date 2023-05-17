import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Stack from 'Stack';
import Button, { peppersButtonColor, peppersButtonSize, peppersButtonVariant } from './index';
import { MdDeleteOutline, MdPhotoCamera } from 'react-icons/md';
/**
 * @STEP1: Init PlaygoundTemplate such as storyName, args
 * @STEP2:
 */
export default {
  //https://storybook.js.org/docs/react/essentials/controls#annotation
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      options: peppersButtonVariant,
      control: { type: 'inline-radio' },
    },
    size: {
      options: peppersButtonSize,
      control: { type: 'inline-radio' },
    },
    color: {
      options: peppersButtonColor,
      control: {
        type: 'select',
      },
    },
    icon: {
      options: ['startIcon', 'endIcon', 'none'],
      control: { type: 'inline-radio' },
      defaultValue: 'none',
    },
  },
} as ComponentMeta<typeof Button>;
const PlaygroundTemplate: ComponentStory<typeof Button> = (args) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hasIcon = (args as any).icon !== 'none';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isStartIcon = (args as any).icon === 'startIcon';

  const StartIcon = () => (hasIcon && isStartIcon ? <MdDeleteOutline /> : null);
  const EndIcon = () => (hasIcon && !isStartIcon ? <MdPhotoCamera /> : null);

  return <Button {...args} startIcon={<StartIcon />} endIcon={<EndIcon />} />;
};
export const Playground = PlaygroundTemplate.bind({});
Playground.storyName = '@Playground';
Playground.args = {
  children: 'Playground',
  color: 'primary',
  disabled: false,
  variant: 'contained',
  size: 'medium',
  //icon: 'none' - for storybook only
};
Playground.parameters = {
  //controls is disabled in global config. Override to make this work like expected behavior
  controls: {
    disabled: false,
  },
};

const VariantTemplate: ComponentStory<typeof Button> = (args) => {
  return (
    <React.Fragment>
      <Button variant="contained" type="submit">
        Contained
      </Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </React.Fragment>
  );
};
export const Variant = VariantTemplate.bind({});
// Variant.args = {};
Variant.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

const SizeTemplate: ComponentStory<typeof Button> = (args) => {
  return (
    <React.Fragment>
      <Stack>
        <Button size="small" classes="mb-1">
          Small
        </Button>
        <Button size="medium" classes="mb-1">
          Medium
        </Button>
        <Button size="large" classes="mb-1">
          Large
        </Button>
      </Stack>
      <Stack>
        <Button variant="outlined" size="small" classes="mb-1">
          Small
        </Button>
        <Button variant="outlined" size="medium" classes="mb-1">
          Medium
        </Button>
        <Button variant="outlined" size="large" classes="mb-1">
          Large
        </Button>
      </Stack>
      <Stack>
        <Button variant="text" size="small">
          Small
        </Button>
        <Button variant="text" size="medium">
          Medium
        </Button>
        <Button variant="text" size="large">
          Large
        </Button>
      </Stack>
    </React.Fragment>
  );
};

export const Size = SizeTemplate.bind({});
// Size.args = {};

const DisabledTemplate: ComponentStory<typeof Button> = (args) => {
  return (
    <React.Fragment>
      <Button variant="contained" disabled>
        Contained
      </Button>
      <Button variant="outlined" disabled>
        Outlined
      </Button>
      <Button variant="text" disabled>
        Text
      </Button>
    </React.Fragment>
  );
};
export const Disabled = DisabledTemplate.bind({});
// Disabled.args = {};
Disabled.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

const ColorTemplate: ComponentStory<typeof Button> = (args) => {
  return (
    <React.Fragment>
      {peppersButtonColor.map((color, i) => (
        <Button color={color} key={i}>
          {color}
        </Button>
      ))}
    </React.Fragment>
  );
};
export const Color = ColorTemplate.bind({});
// Color.args = {};
Color.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];

const ButtonWithIconTemplate: ComponentStory<typeof Button> = (args) => {
  return (
    <React.Fragment>
      <Button startIcon={<MdDeleteOutline />}>Delete</Button>
      <Button variant="outlined" endIcon={<MdPhotoCamera />}>
        Photo
      </Button>
    </React.Fragment>
  );
};
export const ButtonWithIcon = ButtonWithIconTemplate.bind({});
ButtonWithIcon.args = {};
ButtonWithIcon.decorators = [
  (Story) => (
    <Stack>
      <Story />
    </Stack>
  ),
];
