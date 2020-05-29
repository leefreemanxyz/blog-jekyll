---
layout: post
title: "Keeping tracking clean in an SPA"
date: 2018-11-12 12:00:00 +0200
tags: code
---

You're on the home straight. Your tests are green. Your code is splitting. Lighthouse/Pagespeed/other performance metrics love you. And then you get the call – it's marketing. They have _just a few_ scripts they want to add. Bundle-bloat isn't the worst of it - custom events are needed.

<!--more-->

So, after dutifully adding a few scripts from marketing to the head tag, it turns out you aren't quite finished. As your single-page app doesn't really have any new page loads, the analytics scripts don't really behave like they're supposed to.

To fix this, you're asked to add a few custom events and, if you've ever wandered into some legacy codebase, there is a more than reasonable chance that you'll find component files with custom events inside them. It will look something like this:

```jsx
// index.js
class SearchBar extends React.Component {

    ...

    doSearch = () => {
        this.props.doSearch(this.state.someParams)

        // analytics hell
        dataLayer.push({
            'search': this.state.search,
            'autocompleted': this.state.autocompleted
            });

    }

    render(){
        ...
    }
}
```

This works, but I don't particularly like it. My issues with it are:

- I think tracking is a separate concern to the rest of your app.
- Operationally, development and marketing are typically separated and tracking events can be a last minute addition or afterthought.
- Developers are unlikely to have any real say about which tracking technology gets used, so it's not ideal to have it scattered all over your codebase.

Now, the first thing any modern javascript developer is going to do when asked to add Google Analytics/Tag Manager etc., is check for an NPM package (i.e. `react-ga`). But let's look at how we can do this without adding an NPM package. Instead, let's use a sexy ES6 class.

Mozilla Developer Network describes classes as `primarily syntactical sugar over JavaScript's existing prototype-based inheritance`. Sounds great. What we can do is create a class for all our custom tracking events, which is awesome because:

- it abstracts this gross tracking code away from our beautiful component code and moves it into one or a few dedicated files.
- it's easier to unit test this file with a single responsibility.
- it's convenient to make changes to a custom event, or even change analytics providers entirely.
- it doesn't really matter where you want to fire events from - middleware/redux/view layers - they now share a common interface with the tracking functions.

This tracking class could look something like this:

```jsx
// tracking.js
export default class TrackingService {
  /*
   * document what params are expected
   */
  static searchEvent = ({ search, autocompleted }) => {
    dataLayer.push({
      search: search,
      autocompleted: autocompleted,
    });
  };
  // some more tracking events.
}
```

Wherever you want to call this custom event, make sure you've imported `TrackingService`, and then just call the static class method as `TrackingService.searchEvent({search,autocompleted})`.

You can now fire events with a single line of code from wherever is most convenient or makes the most sense in your codebase, and you can find and debug issues with your colleagues in marketing and look super smart and organized while doing so.

Comments, concerns and typos can be directed to the usual channels in the header!
