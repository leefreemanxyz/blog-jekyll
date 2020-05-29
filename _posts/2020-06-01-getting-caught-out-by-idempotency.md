---
layout: post
title: "Creating and solving my own stupid bug with idempotency"
date: 2020-06-01
tags: react,idempotency,javascript
---

I was rebuilding a modal at work recently in React and introduced a small bug caused by toggling booleans. Here's what happened.

<!--more-->

If you're familiar with React state (whether it be in classes or using hooks), then you should be aware of the following pattern for setting state:

```jsx
const App = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount((c) => c + 1)}>Click me</button>
    </div>
  );
};
```

`setCount` here could have been called as `setCount(count+1)`, but as React state updates might be batched, you could introduce bugs as `count` might be stale if multiple `setCount`s are batched together. By calling `setCount(c => c + 1)`, you should always have the correct value for count being incremented. Similarly we could do this for a boolean value, like so:

```jsx
const App = () => {
  const [darkMode, toggleDarkMode] = useState(false);
  return (
    <div className={`App ${darkMode && `DarkMode`}`}>
      <button onClick={() => toggleDarkMode((c) => !c)}>Click me</button>
    </div>
  );
};
```

With this css file:

```css
.App {
  background-color: blue;
}

.DarkMode {
  background-color: red;
}
```

This snippet will toggle the background color of the div between blue and red when the 'DarkMode' class is added. When building this modal, I needed to animate it sliding out from the right, so let's add a transition to this change in background color.

```css
.App {
  background-color: blue;
  transition: background-color 1.5s ease;
}
```

Beautiful. So this code works pretty well for toggling the background color like this, but if you click the button while it's transitioning, it starts transitioning back to blue or red. This is where the problem lies when toggling our modal.

I decided to use [React-Modal](http://reactcommunity.org/react-modal/) to build the modal – I had a button in my interface to toggle a boolean and open the modal and used the same toggling function to close the modal through React-Modal's `onRequestClose`. Here's an example:

```jsx
import React, { useState } from "react";
import ReactModal from "react-modal";

import "./styles.css";

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen((c) => !c);
  };
  return (
    <div className={`App`}>
      <button onClick={toggleModal}>Open Modal</button>
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={toggleModal}
        closeTimeoutMS={2000}
      >
        <p>Modal text!</p>
        <button onClick={toggleModal}>Close Modal</button>
      </ReactModal>
    </div>
  );
};

export default App;
```

At the moment, there doesn't seem to be any bug here. If you click "Open Modal", it opens, and likewise for when you click on "Close Modal" or click outside the modal. But the bug is about to rear it's head. When I now add a fade-in/fade-out transition using this CSS:

```css
.ReactModal__Overlay {
  opacity: 0;
  transition: opacity 2000ms ease;
}

.ReactModal__Overlay--after-open {
  opacity: 1;
}

.ReactModal__Overlay--before-close {
  opacity: 0;
}
```

The `toggleModal` function is no longer working correctly. If you open the modal, and then click outside of it twice, then it starts to fade and then re-opens again. Ouch. The issue here is that my toggle function isn't idempotent. While the updater function is fine for setting a count `setCount(c => c + 1)`, clearly some functions only need to be called once, and if they are called twice, then they shouldn't have an effect. This is idempotency (see [MDN docs on idempotent HTTP requests](https://developer.mozilla.org/en-US/docs/Glossary/Idempotent)). Clicking a button to open a modal should only ever lead to it being opened. Clicking outside the modal should only ever lead to it being closed. So in this case, the updater function won't suffice, we need to wire it up separately:

```jsx
const App = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={`App`}>
      <button onClick={openModal}>Open Modal</button>
      <ReactModal
        ariaHideApp={false}
        isOpen={modalOpen}
        onRequestClose={closeModal}
        closeTimeoutMS={2000}
      >
        <p>Modal text!</p>
        <button onClick={closeModal}>Close Modal</button>
      </ReactModal>
    </div>
  );
};
```

Now it doesn't matter how many times you click outside an opened modal, it's only going to be closed. While this was an easy bug to fix, I'll be sure to think twice in future before idly writing `toggleX(x => !x)`.
