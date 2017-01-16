# react-calendar-components

**Components for `(building a month calendar with || learning)` React.**

An example project that explores various _*[React](facebook.github.io/react/)_ concepts and serves as an example for learning purposes.

* _*I'm aiming to keep this compatible with others such as [Preact](https://preactjs.com/)_ and [Inferno](https://infernojs.org/)

Poke around [src/components/](src/components/), [src/stories/](src/stories/) or...

...go play with the live examples via [Storybook](https://getstorybook.io/): [https://erikthedeveloper.github.io/react-calendar-components/](https://erikthedeveloper.github.io/react-calendar-components/?selectedKind=Composing%20Calendar&selectedStory=Select%20Range%20%2B%20Day%20Indicators&full=0&down=0&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel)

![composingcalendarfun](https://cloud.githubusercontent.com/assets/1240178/21851184/223de5de-d7cb-11e6-8ca2-120364b5b317.gif)

## React Concepts

- Higher order components
- Render callbacks (aka function as children)
- Composing behavior from multiple higher order components
- Built with [create-react-app](https://github.com/facebookincubator/create-react-app)
- Writing UI stories with [Storybook](https://getstorybook.io/)
- [TODO] ...

## Other Concepts

- Working with Javascript's [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) API
- Writing tests with [Jest](https://facebook.github.io/jest/)
- BEM (aka you might not need SASS)
- Flexbox (on a basic level)
- [TODO] ...

## Summary

To summarize the overall approach used and application:

1. Enhance `Calendar` with desired features via applying related higher order components. These can be applied either [singly (example)](https://github.com/erikthedeveloper/react-calendar-components/blob/master/src/stories/Calendar-stories.js#L16-L18) or [by combining multiple (example)](https://github.com/erikthedeveloper/react-calendar-components/blob/master/src/stories/Calendar-stories.js#L47-L50)
2. Each [`Calendar` higher order component](https://github.com/erikthedeveloper/react-calendar-components/blob/master/src/components/Calendar) is intended to be composable. This is primarily enabled through treating `Day` as a [Component as prop](https://github.com/erikthedeveloper/react-calendar-components/blob/master/src/components/Calendar/Calendar.js#L74)...
3. ...and having each `Calendar` HoC "enhance" its own `props.DayComponent` _(also via composing higher order components)_ [see this usage](https://github.com/erikthedeveloper/react-calendar-components/blob/master/src/components/Calendar/indicators.js#L18-L37)
4. The [`EnhanceDay` render callback component](https://github.com/erikthedeveloper/react-calendar-components/blob/master/src/components/Calendar/EnhanceDay.js) ensures that each Calendar's `props.DayComponent` is only enhanced as-needed. More generally this enables deriving/computing properties from `props` while avoiding the computed values becoming stale.

## Development

:memo: [`yarn` is interchangeable with `npm`](https://yarnpkg.com/en/docs/migrating-from-npm).

```
git clone git@github.com:erikthedeveloper/react-calendar-components.git
cd react-calendar-components
yarn install
yarn start
```

You should now be able to view the Storybook on your [http://localhost:9009/](http://localhost:9009/).

Have fun.
