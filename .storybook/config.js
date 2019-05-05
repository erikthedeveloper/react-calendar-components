import {configure, addParameters} from '@storybook/react';

addParameters({
  options: {
    showPanel: false,
  },
});

function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
