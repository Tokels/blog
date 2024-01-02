---
title: "The Power of Context Providers - Toastify"
excerpt: "Get cleaner code by using Context Providers"
coverImage: "/assets/blog/goodie-keyboardstatusprovider/cover.jpg"
date: "2023-12-27T10:45:39.322Z"
author:
  name: Julia Stjerna
  picture: "/assets/blog/authors/julia.jpeg"
ogImage:
  url: "/assets/blog/goodie-keyboardstatusprovider/cover.jpg"
---

## The Power of Context Providers - Toastify

Wouldn't it be amazing if you could deliver a message to the user with such clean component?

```javascript
const DoSomething = () => {
  const { setToast } = useToast();

  const handlePress = async () => {
    try {
      await doSomethingAsync();
      setToast((prevState) => ({ ...prevState, success: "I Did Something!" }));
    } catch (error) {
      (prevState) => ({ ...prevState, error });
    }
  };

  return <Button title="Do Something" onPress={handlePress} />;
};
```

Well, you can! Add below context provider. You're welcome!

```javascript
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import ToastManager, { Toast } from "toastify-react-native";

type Toast = {
  error: string,
  success: string,
};

export const toastInit: Toast = {
  error: "",
  success: "",
};

type ToastProps = {
  setToast: Dispatch<SetStateAction<Toast>>,
};

const ToastContext = createContext < Partial < ToastProps >> {};

export function useToast() {
  return useContext(ToastContext);
}

export const ToastProvider = ({ children }: { children: ReactElement }) => {
  const [toast, setToast] = useState(toastInit);

  useEffect(() => {
    try {
      if (toast.error) {
        Toast.error(toast.error, "");
      }
      if (toast.success) {
        Toast.success(toast.success, "");
      }
    } finally {
      setToast(toastInit);
    }
  }, [toast]);

  return (
    <ToastContext.Provider
      value={{
        setToast,
      }}
    >
      <ToastManager />
      {children}
    </ToastContext.Provider>
  );
};
```
