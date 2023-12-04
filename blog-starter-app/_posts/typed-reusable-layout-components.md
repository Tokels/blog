---
title: "Creating Reusable Layout Components in React with TypeScript"
excerpt: "React, paired with TypeScript, provides a powerful combination for building modular and maintainable applications. One of the key principles in achieving this goal is the creation of reusable layout components. In this article, we'll explore the significance of reusable layout components and walk through the process of building them using TypeScript."
coverImage: "/assets/blog/typed-reusable-layout-components/cover.jpg"
date: "2023-04-12T12:35:07.322Z"
author:
  name: Julia Stjerna
  picture: "/assets/blog/authors/julia.jpeg"
ogImage:
  url: "/assets/blog/typed-reusable-layout-components/cover.jpg"
---

# Creating Reusable Layout Components in React with TypeScript

React, paired with TypeScript, provides a powerful combination for building modular and maintainable applications. One of the key principles in achieving this goal is the creation of reusable layout components. In this article, we'll explore the significance of reusable layout components and walk through the process of building them using TypeScript.

## Why Reusable Layout Components?

Reusable layout components play a crucial role in front-end development for several reasons:

### 1. **Consistency:**

Reusable layout components enable the creation of consistent user interfaces throughout an application. Consistency is key to providing a seamless and user-friendly experience.

### 2. **Maintainability:**

By encapsulating specific layout structures into reusable components, developers can make their codebase more maintainable. Changes to the layout can be centralized, reducing the risk of bugs and making it easier to manage updates.

### 3. **Scalability:**

As applications grow, having a set of reusable layout components ensures scalability. Developers can efficiently compose complex UIs by combining and nesting these components.

## Creating Reusable Layout Components in TypeScript

### 1. **Card Component:**

Let's start by creating a simple `Card` component. This component will encapsulate the structure and styling commonly associated with cards in a UI.

```plaintext
src/
├── components/
│   ├── Card/
│   │   ├── Card.tsx
│   │   └── Card.css

```

```tsx
// Card.tsx

import React, { ReactElement } from "react";
import "./Card.css";

interface CardProps {
  children: ReactElement;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return <div className="card">{children}</div>;
};

export default Card;
```

```css
/* Card.css */

.card {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
```

```tsx
// Example usage in another component

import React from "react";
import Card from "../Card/Card";

const SomeComponent: React.FC = () => {
  return (
    <div>
      <h2>Reusable Card Example</h2>
      <Card>
        <p>This is the content of the card.</p>
      </Card>
    </div>
  );
};

export default SomeComponent;
```

### 2. **SplitScreen Component:**

Now, let's create a more complex `SplitScreen` component. This component will divide the user interface into two distinct sections, providing a flexible layout for side-by-side content display.

```tsx
// SplitScreen.tsx

import React, { ReactElement } from "react";
import "./SplitScreen.css";

interface SplitScreenProps {
  leftPanel: ReactElement;
  rightPanel: ReactElement;
}

const SplitScreen: React.FC<SplitScreenProps> = ({ leftPanel, rightPanel }) => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 overflow-auto p-8 bg-gray-200">{leftPanel}</div>
      <div className="flex-1 overflow-auto p-8 bg-white">{rightPanel}</div>
    </div>
  );
};

export default SplitScreen;
```

```css
/* SplitScreen.css */

.flex {
  display: flex;
}

.h-screen {
  height: 100vh;
}

.overflow-auto {
  overflow: auto;
}

.p-8 {
  padding: 8px;
}

.bg-gray-200 {
  background-color: #f0f0f0;
}

.bg-white {
  background-color: #ffffff;
}
```

```tsx
// Example usage in another component

import React from "react";
import SplitScreen from "../path";

const AnotherComponent: React.FC = () => {
  return (
    <SplitScreen
      leftPanel={<Card>This is the left panel content</Card>}
      rightPanel={<Card>This is the right panel content</Card>}
    />
  );
};

export default AnotherComponent;
```

### 3. **SplitScreen Component 2.0:**

Now, let's make it even more complex `SplitScreen`. This component will be smarter and take `children` as a prop.

```tsx
// SplitScreen.tsx

import React, { ReactElement } from "react";
import "./SplitScreen.css";

interface SplitScreenProps {
  children: ReactElement[];
}

const SplitScreen: React.FC<SplitScreenProps> = ({ children }) => {
  const [leftPanel, rightpanel] = children;
  return (
    <div className="flex h-screen">
      <div className="flex-1 overflow-auto p-8 bg-gray-200">{leftPanel}</div>
      <div className="flex-1 overflow-auto p-8 bg-white">{rightPanel}</div>
    </div>
  );
};

export default SplitScreen;
```

```tsx
// Example usage in another component




import React from 'react';
import SplitScreen from '../path';

const AnotherComponent: React.FC = () => {
  return (
    <SplitScreen>
        <Card>This is the left panel content</Card>
        <Card>This is the right panel content</Card>
    </Splitscreen>
  );
};





export default AnotherComponent;
```

### 4. **SplitScreen Component 3.0:**

Now, let's make an even more complex `SplitScreen` component. This component will take `children` as a prop, but this time the children can be unlimited numbers and the screen will be visually divided equally dependent on how many children are passed. To give you some more sugar a lot more features are added. See documentation one section below on how to use this component.

```tsx
// SplitScreen.tsx

import React from "react";
import type { FC, ReactElement } from "react";
import { View } from "react-native";
interface SplitScreenProps {
  children: ReactElement[];
  weigths?: number[];
  row?: boolean;
  styleChildren?: string;
  styleParent?: string;
  centered?: boolean;
}

const SplitScreen: FC<SplitScreenProps> = ({
  children,
  weigths = [],
  row = false,
  styleChildren = "",
  styleParent = "",
  centered = true,
}) => {
  // If no weigths are provided, w (weights) will default to 1 per element
  const w = weigths?.length > 0 ? weigths : children.map(() => 1);
  return (
    <View
      className={`flex flex-${
        row ? "row" : "col"
      } h-full w-full ${styleParent}`}
    >
      {children.map((component, idx) => {
        const flex = w[idx];
        return (
          <View
            className={`${
              centered && "justify-center items-center"
            } ${styleChildren}`}
            key={`splitscreen-pane-${idx}-${component.key}`}
            style={{ flex }}
          >
            {component}
          </View>
        );
      })}
    </View>
  );
};

export default SplitScreen;
```

```tsx
// Example usage in another component

import React from 'react';
import SplitScreen from '../path';

const AnotherComponent: React.FC = () => {
  return (
    <SplitScreen weigths=[1,2,1]>
        <Card>This will take up 1/4 of the screen</Card>
        <Card>This will take up 2/4 of the screen</Card>
        <Card>This will take up 1/4 of the screen</Card>
    </Splitscreen>
  );
};

export default AnotherComponent;
```

## Here's a documentation on how to use the SplitScreen.tsx 3.0 component:

# SplitScreen.tsx

1. _Modular and reusable layout component_

2. _This component will render every child_

3. _It will default to center you elements_

   - To change this: simply add "centered" as props
     - `centered=false`

4. _It will default to divide screen space equally for all elements_

- To change this: simply add a "weights" array as props
  - General example:
    - `weigths=[a, b, c]`
      - _First child width/height = a/a+b+c_
      - _Second child width/height = b/a+b+c_
      - _First child width/height = c/a+b+c_
  - Specific example:
    - `weights=[1, 2, 1]`
      - _First child width/height = 1/4_
      - _Second child width/height = 2/4_
      - _Third child width/height = 1/4_

5. _It will default to layout your elements vertically_

   - To change to horisontal mode, simply add "row" as props
     - `row={true}`

6. _There's some additional styling props:_
   - Style your childrens parents parent
     - `styleParent`
   - Style your childrens parent
     - `styleChildren`

## Conclusion

Reusable layout components are a cornerstone of building maintainable and scalable React applications with TypeScript. By encapsulating common UI structures, such as cards and split screens, developers can achieve consistency and ease of maintenance. This approach fosters a modular design, making it simpler to adapt and extend applications as they evolve.

In your projects, consider identifying recurring layout patterns and encapsulating them into reusable components. This practice not only enhances the development workflow but also contributes to the overall quality and longevity of your React applications. Happy coding!
