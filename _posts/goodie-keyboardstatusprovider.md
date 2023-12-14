---
title: "Goodie! Keyboard status context provider"
excerpt: "Your welcome! Here's a goodie for you: a keyboard status context provider for React Native, of course using typescript. At the end: all you need is a hook!"
coverImage: "/assets/blog/goodie-keyboardstatusprovider/cover.jpg"
date: "2023-12-05T10:45:39.322Z"
author:
  name: Julia Stjerna
  picture: "/assets/blog/authors/julia.jpeg"
ogImage:
  url: "/assets/blog/goodie-keyboardstatusprovider/cover.jpg"
---

## Goodie! Keyboard status context provider

Writing good context providers results in maintainable code, always strive to keep your components as clean as possible. Beautiful code: beautiful 🧠 with less confusion.

P.s. use this template for other state that could live in the global context, e.g. is the user authenticated? Is it dark or bright theme? The possibilities are endless!

```javascript
import React, {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Keyboard } from "react-native";

type KeyboardStatusProps = {
  keyboardStatus: boolean,
};

const KeyboardStatusContext =
  createContext < Partial < KeyboardStatusProps >> {};

export function useKeyboardStatus() {
  return useContext(KeyboardStatusContext);
}

export const KeyboardStatusProvider = ({
  children,
}: {
  children: ReactElement,
}) => {
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <KeyboardStatusContext.Provider
      value={{
        keyboardStatus,
      }}
    >
      {children}
    </KeyboardStatusContext.Provider>
  );
};
```
