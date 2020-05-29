---
layout: post
title: "Multilingual sites with React's Context API"
date: 2018-04-13 12:00:00 +0200
tags: code
---

React's new Context API was finally made available with React 16.3 two weeks ago, and I was working on a client's multilingual site that was passing the locale information through the props of every component. The context API seemed like a fairly decent way of avoiding having to pass the props like this, so this is my super quick implementation of how to do just that.

<!--more-->

After running create-react-app, you want to create your React Context. So, in my /src folder, I created a simple file called `locale-context.js` and exported my LocaleContext:

```jsx
import React from "react";

export const LocaleContext = React.createContext();
```

Cool. Now I'm going to import the LocaleContext into my `App.js` and wrap everything inside it.

```jsx
import React, { Component } from "react";
import { LocaleContext } from "./locale-context";
import SomeContainer from "./SomeContainer";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preferredLocale: "en",
    };
  }
  changeLanguage = ({ currentTarget: { id } }) => {
    this.setState({
      preferredLocale: id,
    });
  };
  render() {
    return (
      <LocaleContext.Provider value={this.state.preferredLocale}>
        <SomeContainer changeLanguage={this.changeLanguage} />
      </LocaleContext.Provider>
    );
  }
}
```

So, what's happening here? In my app's state I'm storing the preferred locale of my user. When working on this for a client, I store the preferred locale in localStorage and initialize it in my Redux store and pass it into the value of my provider through props, so it works across page reloads etc.

I've got a function to update the locale, and I pass this into the props of `SomeContainer`. Cool.

```jsx
import React, { Component } from "react";
import LanguagePicker from "./LanguagePicker";
import AboutMe from "./AboutMe";
import WhereIAmFrom from "./WhereIAmFrom";

const styles = {
  app: {
    textAlign: "center",
  },
};

export default class SomeContainer extends Component {
  render() {
    return (
      <div style={styles.app}>
        <h1>About me</h1>
        <LanguagePicker changeLanguage={this.props.changeLanguage} />
        <AboutMe />
        <WhereIAmFrom />
      </div>
    );
  }
}
```

This is the `SomeContainer` component. I'm importing two components to display information and a `LanguagePicker` component, which I'm passing the change language function into. As you can see, the `AboutMe` and `WhereIAmFrom` components are not having information about languages passed to them. They'll be using context to access it.

This demo has a folder called `locales` that contains a json file for each language, and a `Translate` component. The json files should have all the same keys, but the values will be translated for each language.

```jsx
import React, { Component } from "react";
import { LocaleContext } from "../locale-context";

import en from "./en.json";
import es from "./es.json";
import nl from "./nl.json";

export default class Translate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      langs: {
        en,
        es,
        nl,
      },
    };
  }
  render() {
    const { langs } = this.state;
    const { string } = this.props;
    return (
      <LocaleContext.Consumer>
        {(value) => langs[value][string]}
      </LocaleContext.Consumer>
    );
  }
}
```

This is my `Translate` component. The render function is simply consuming the `LocaleContext` and using its value and the key for the string passed into the component as a prop to find the correct translation from our .json files. I imagine there is a way to do this without state, but let's not worry about that for now.

I won't go into the `LanguagePicker`, it should be fairly self-explanatory. Whenever you want to render a multilingual string, you import the `Translate` component and pass it the key for the string as it is found in your .json files.

```jsx
import React, { Component } from "react";
import Translate from "./locales/Translate";

const styles = {
  aboutMe: {
    border: "3px solid black",
    margin: "0 25%",
  },
};

export default class AboutMe extends Component {
  render() {
    return (
      <div style={styles.aboutMe}>
        <p>
          <Translate string={"about-me.name"} />
        </p>
        <p>
          <Translate string={"about-me.age"} />
        </p>
        <p>
          <Translate string={"about-me.education"} />
        </p>
      </div>
    );
  }
}
```

That's about it for the demo. The code is available on [my GitHub](https://github.com/leefreemanxyz/react-context-multilingual). Any questions, comments or concerns, please open an issue there.

[Link to demo.](https://react-context-demo.leefreeman.xyz/)
