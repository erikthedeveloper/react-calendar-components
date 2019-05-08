import {configure, addParameters, addDecorator} from '@storybook/react';
import {withA11y} from '@storybook/addon-a11y';

addParameters({
  options: {
    showPanel: false,
  },
});

addDecorator(withA11y);

function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
