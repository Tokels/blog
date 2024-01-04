---
title: "The Power of Context Providers - Generic Template"
excerpt: "I'm giving you a generic template for setting up your context, typesafety included and reasoning why to use the Context API."
coverImage: "/assets/blog/context/cover.jpg"
date: "2024-01-04T10:45:39.322Z"
author:
  name: Julia Stjerna
  picture: "/assets/blog/authors/julia.jpeg"
ogImage:
  url: "/assets/blog/context/cover.jpg"
---

## The Power of Context Providers - Generic Template

### Introduction

#### Straight to it!

I'm giving you an awezome generic template for setting up your context. After these codesnippets you'll have some other headings to read of why Context is amazing.

```javascript
// ContextProvider.tsx
type Props = {
  <all the props you need>
};

const Context = createContext < Partial < Props >> {};

export function useCustomContext() {
  return useContext(Context);
}

export default function ContextProvider({ children: ReactElement }) {
  return (
    <Context.Provider value={{<all the props you need>}}>
      {children}
    </Context.Provider>
  )
}

```

Then we need to wrap our app in with our Context:

```javascript
// _layout.tsx
export default function RootLayout() {
  return (
    <ContextProvider>
      <App />
    </ContextProvider>
  );
}
```

### Why Context?

##### Reasons to Use Context API and Context Providers in React

#### 1. Avoiding Prop Drilling:

- Context helps to eliminate prop drilling, making your code cleaner and more maintainable.

#### 2. Global State Management:

- Create a global state accessible to any component, useful for shared data like user authentication status or theme information.

#### 3. Easier Component Composition:

- Context allows for easier component composition, making your component structure more flexible and easier to refactor.

#### 4. Simplifies State Management for Contextual Data:

- Use context to manage and update data that needs to be available to a specific part of your component tree.

#### 5. Improves Code Readability:

- Context Providers make it explicit where data comes from, improving code readability and understanding.

#### 6. Reduced Component Coupling:

- Decouple components by using context, making them more independent and reusable.

#### 7. Performance Optimization:

- Subscribe to changes in context values for performance improvements by only re-rendering components that depend on changed values.

#### 8. Middleware or HOC Replacement:

- Context can be an alternative to higher-order components (HOCs) or middleware, providing a cleaner way to manage shared logic.

In summary, the Context API and Context Providers in React are powerful tools for managing state and sharing data in an organized and efficient manner, especially in scenarios where prop drilling becomes impractical or cumbersome.

### Example of usage

Example of usage can be found [here](https://juliastjerna.vercel.app/posts/toastify-provider) or [here](https://juliastjerna.vercel.app/posts/goodie-keyboardstatusprovider).
