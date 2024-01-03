---
title: "The World of Errors"
excerpt: "I find myself constantly resolving the same errors. This list is for me to keep track on problems I've already solved."
coverImage: "/assets/blog/application-setup/part-01-cover.jpg"
date: "2000-05-01T10:45:39.322Z"
author:
  name: Julia Stjerna
  picture: "/assets/blog/authors/julia.jpeg"
ogImage:
  url: "/assets/blog/application-setup/part-01-cover.jpg"
---

## The World of Errors

### 1.

I wanted to be able to create a 'main.css' file in my react native application to add custom variables like this:

```css
@tailwind base;

@tailwind components;

@tailwind utilities;

.theme-dark {
  --color-custom-100: 158, 200, 185;
  --color-custom-200: 92, 131, 116;
  --color-custom-300: 27, 66, 66;
  --color-custom-400: 9, 38, 53;
}

.theme-light {
  --color-custom-100: 9, 38, 53;
  --color-custom-200: 27, 66, 66;
  --color-custom-300: 92, 131, 116;
  --color-custom-400: 158, 200, 185;
}
```

NativeWind v2 have no support for an external css file like tailwind has, but they're updating this in NativeWind v4 that will be released in early 2024.
