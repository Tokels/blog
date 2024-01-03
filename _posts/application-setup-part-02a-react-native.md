---
title: "React Native - Setup application - TypeScript, NativeWind, Jest, Cypress, SecureStore, TanstackQuery, Toastify"
excerpt: "Let's setup a React Native application combining valuable and useful libraries to get your MVP going as quick as possible. We will also do this using agile methods and a CI/CD workflow. When finished you'll have a React Native app with type safety, routing with tabs, testing, formatting, linting, local storage, styling, layouting utils, state management both sync and async and side effects handling."
coverImage: "/assets/blog/application-setup/part-01-cover.jpg"
date: "2024-01-03T10:45:39.322Z"
author:
  name: Julia Stjerna
  picture: "/assets/blog/authors/julia.jpeg"
ogImage:
  url: "/assets/blog/application-setup/part-01-cover.jpg"
---

## Application from scratch - Setup Part 2a. React Native

At the end of this article you'll have a fully functional React Native application with type safety, routing with tabs, testing, formatting, linting, local storage, styling, layouting utils, state management both sync and async and side effects handling.

All code is open source in [this repository](https://github.com/Tokels/react-native-template).

To get access to the final template without following all the below steps you can cheat by running:
`git clone --depth 1 -b v0.0.1 https://github.com/Tokels/react-native-template.git`

We'll work according to [this workflow](https://juliastjerna.vercel.app/posts/application-setup-part-01) (GitHub organization, GitHub Projects, Project Boards etc.). Let's continue the setup with setting up a React Native project from scratch. You can also visit [this project board](https://github.com/orgs/Tokels/projects/2/views/2) where you will be able to see all these steps and the pull requests belonging to each todo-item.

We will continue with this workflow for each step:

1. Add item to "Todo - <placeholder for feature>"
2. Add description
3. Assign item to developer
4. Convert to issue - choose repository where issue belongs too
5. Add label/s
6. Create branch
7. Do what you need to do for the issue
8. Add, commit and push
9. Merge with main, later when CD is setup we will only merge with main if the preview build is successful
10. Securely delete branch

### Step 1. Setup Expo App (TS Template)

**Expo allows you to quickly start developing your app without worrying about device-specific setup or native code dependencies.**

1. `npx create-expo-app --template`
2. When prompted to choose a template, select the `Navigation (TypeScript)` template.

### Step 2. Delete template code

I kept it simple, [view commit](https://github.com/Tokels/react-native-template/commit/f4da2e41d037099c2274704b18092b7b0aed16c8)

### Step 3. Setup ESLint & Prettier

1. ESLint and Prettier configured according to [This article](https://medium.com/@josiahmahachi/how-to-set-up-eslint-in-vs-code-for-react-native-applications-that-use-typescript-7a103f264d6d)
2. Add scripts to package.json:

```
    "lint": "npx eslint . --ext .js,.jsx,.ts,.tsx",
    "lint-fix": "npm run lint -- --fix",
    "format": "prettier --check ./",
    "format-fix": "npx prettier --write ./"
```

3. `npm run lint-fix && npm run format-fix`
4. Edit template code to fix eslint errors

My .eslintrc.js ended up looking [like this](https://github.com/Tokels/react-native-template/commit/32bedccdbd0d40d0d54751a9b03fdb898f670554#:~:text=%40%40%20%2D0%2C0%20%2B1%2C46%20%40%40-,module.exports%20%3D%20%7B,%7D%3B,-2%20changes%3A%202)

### Step 4. Setup Jest

Setup Typescript with Jest according to [This article](https://reactnative.dev/blog/2018/05/07/using-typescript-with-react-native)

Followed by the steps in [This documentation](https://kulshekhar.github.io/ts-jest/docs/guides/react-native/)

To see what I did, (view commit)[https://github.com/Tokels/react-native-template/commit/10c6940bcfa36d2ce94ff0fc72ac87379d554b34]

### Step 5. Setup Cypress

[Configuration Documentation](https://docs.cypress.io/guides/references/configuration)
And [how to use Cypress with TS](https://docs.cypress.io/guides/tooling/typescript-support)

To see what I did, [view commit](https://github.com/Tokels/react-native-template/commit/a9ce5690044b8b574629f303591a981114badec3)

### Step 6. Move to Src folder

As your project grows, it can be helpful to move all of the directories containing application code into a single src directory. Expo supports this according to [this doc](https://docs.expo.dev/router/reference/src-directory/)

I did it like this, [view commit](https://github.com/Tokels/react-native-template/commit/6925d58090b9cd9d7d187a43e23dc50673fa8647)

I later noticed that I didn't change the pointer to the asset folder in app.json, [I fixed it here](https://github.com/Tokels/react-native-template/pull/19/commits/bef9f24bbbfdb4f0543cdfeb26accda37e9e9870)

### Step 7. Setup CI and Step 8. Setup CD

Using GitHub actions, follow [This article](https://blog.saeloun.com/2022/09/21/expo-ci-cd/)

1. Typo in example for CD in article, `((` and `))` should be `{{` and `}}`
2. If you have subdirectory in root, follow [This stack](https://stackoverflow.com/questions/68639588/github-actions-dependencies-lock-file-is-not-found-in-runners-path)
3. Make sure to create an EXPO_TOKEN, [Described in this doc](https://docs.expo.dev/eas-update/github-actions/)

I also created a preview when a pull request is made, according to [This doc by expo](https://docs.expo.dev/eas-update/github-actions/).

I you get an error like:
`Error: Generating a new Keystore is not supported in --non-interactive mode`
Simply run `npx eas build --platform android` in your wdir and Expo will generate the Keystore for you. You can then rerun the job.

[View my commit for CI](https://github.com/Tokels/react-native-template/commit/abdf83a5e5a446702fc91057bf7d3341d6c7aee5)
[View my commit for CD](https://github.com/Tokels/react-native-template/commit/1e4d6d4a7e1f37777afa719718b76a72f2d84fb2)

Check: did you create an [eas.json](https://github.com/Tokels/react-native-template/blob/main/eas.json) file?

### Step 8. Setup NativeWind (tailwind)

1. `yarn add nativewind`
2. `yarn add --dev tailwindcss`
3. `npx tailwindcss init`
4. Add to contents array `'./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'` in tailwind config file
5. Add to plugins array `'nativewind/babel',` in babel config file
6. Add `/// <reference types="nativewind/types" />` to `global.d.ts` file
7. Add to your top-level component, e.g. index.tsx or app.tsx (this will be deprecated in NativeWind v4)

```javascript
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});
```

There's a bug not yet fixed with tailwindcss that will give you this error:

```javascript
Use process(css).then(cb) to work with async plugins
```

I locked the version of tailwindcss to 3.2.2, solved in [This issue](https://github.com/marklawlor/nativewind/issues/498#:~:text=on%20Jul%2014-,Tailwindcss%20published%20a%20breaking%20change%20as%20a%20minor%20version.%20Please%20lock%20your%20tailwindcss%403.3.2,-%F0%9F%91%8D)

This is what I ended up doing, [view commit](https://github.com/Tokels/react-native-template/pull/19/commits/e361714e976f1838b10344dc6ebcaa5419ac3f73)

### Step 9. Setup SecureStore

Setup SecureStore, recommended for sensitive data by Expo in [This documentation](https://docs.expo.dev/develop/user-interface/store-data/).

[Installation](https://docs.expo.dev/versions/latest/sdk/securestore/).

### Step 10. Setup Toastify

We'll use Toastify to handle messages to the user. This includes error messages and successful messages. We'll use the default styling for now.

To simplify the usage of Toastify we'll create a custom Context Provider and pass a setter to the children. This setter will trigger the toast.

[Click here](https://juliastjerna.vercel.app/posts/toastify-provider) to read more about this powerful context provider

[View my commit here](https://github.com/Tokels/react-native-template/pull/23/commits/dfa34ebbf1ae0f945c9169a143ba51d600a71aef)

My build was failing because toastify uses dependencies that it doesn't install itself. I installed these manually, [See commit](https://github.com/Tokels/react-native-template/pull/23/commits/6362046c1d679a71343e28f778115e80f020cb0f)
After installing these I could successfully preview my build and could then merge with main.

### Step 11. Setup TanStack Query

Powerful asynchronous state management

1. `yarn add @tanstack/react-query`
2. `yarn add --dev @tanstack/eslint-plugin-query`
3. Initialise QueryClient
4. Wrap app with QueryClientProvider passing queryClient as client

Here's [my commit](https://github.com/Tokels/react-native-template/commit/a76cf99d3d1578e6589909b7012b14d87d7317ce) for the TanStack setup.
I also made a commit for an example on how to use TanStack Query using a Provider that wraps the components, making the components be able to perform complex task without handling the logic. You can see it [here](https://github.com/Tokels/react-native-template/commit/3f3eff73bc96f1ebc6bea8fa0e23e654e74d9d36).

### Step 12. Adapt Design for Side Effects

`Side Effects` refer to changes that a function or an expression makes to the state of the program or the environment outside of its own scope. `Network Request` are an example of a side effect where it's important to inform the user what is happening in case the request takes too long.

[You can read more about side effects here](https://juliastjerna.vercel.app/posts/side-effects-ux). In the article I explain about different side effects, and how we can adapt to our side effects in terms of design.

So far in our application we've already setup Toastify which handles side effects, but what about loading spinners when the user is waiting? For this step we'll setup a provider for the loading spinner which we can wrap around whatever element we need. So instead of doing this:

```javascript
{
  isLoading ? <ActivityIndicator /> : <YourComponent />;
}
```

We'll be doing this:

```javascript
<ActivityIndicatorProvider>
  <YourComponent />
<ActivityIndicatorProvider />
```

View [my commit](https://github.com/Tokels/react-native-template/commit/441f17b1210e8cf8d927780d6422956abb648f51) to get access to the Provider.

### Step 13. Add a ThemeProvider

I read [this quick article](https://levelup.gitconnected.com/how-to-use-themes-with-tailwind-css-9d5f20231d37) and got some inspiration of how I want this application to handle theme styling. This is important because in the beginning of a project the style might change constantly. Creating a good framework of testing different colours are essential, a simple setup will reduce so much time spent on styling later on.

Unfortunately, NativeWind doesn't support customed `styles.css` yet, however, they are releasing it in v4, [read docs](). v4 is up for testing for `npm`, but I prefer to wait until the final release since it will happen soon.

Meanwhile, I'll keep the setup as in [this commit](https://github.com/Tokels/react-native-template/pull/31/commits/2abeaaaafebc80e1b618b0dd5e6cdcd3eed6969e) and will create a separate ticket to upgrade NativeWind once final v4 release.

### Step 14. Create a Reusable layout component

[Read more](https://juliastjerna.vercel.app/posts/typed-reusable-layout-components) about reusable layout components and why they are awesome. I have also provided a smart layout component in that article, or you can [view my commit]().

### Step 15. Git Tags

I will add a milestone commit where I will add some description in the main Readme.md because now we have a fully functional template for a React Native app with type safety, routing with tabs, testing, formatting, linting, local storage, styling, layouting utils, state management both sync and async and side effects handling.

To get access to the final template simply run:
`git clone --depth 1 -b v0.0.1 https://github.com/Tokels/react-native-template.git`

To add authentication to your application, continue by reading [this article](https://juliastjerna.vercel.app/posts/application-setup-part-02b-react-native).
