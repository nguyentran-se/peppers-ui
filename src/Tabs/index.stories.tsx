import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Tabs, { TabPanel, TabPanels } from './index';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/Tabs',
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const PlaygroundTemplate: ComponentStory<typeof Tabs> = (args) => (
  <Tabs>
    <TabPanels>
      <TabPanel>Panel 0</TabPanel>
      <TabPanel>Panel 1</TabPanel>
      <TabPanel>Panel 2</TabPanel>
    </TabPanels>
  </Tabs>
);

export const Playground = PlaygroundTemplate.bind({});
Playground.storyName = '@Playground';
Playground.args = {
  children: 'Tabs children',
};
