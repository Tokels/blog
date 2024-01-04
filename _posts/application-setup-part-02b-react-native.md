---
title: "React Native - Setup application - Simple Authentication and Routing"
excerpt: "Let's setup simple authentication and routing so that you can start with your MVP as quickly as possible. On top of this we'll use agile methods and a CI/CD workflow."
coverImage: "/assets/blog/application-setup/part-01-cover.jpg"
date: "2024-01-04T10:45:39.322Z"
author:
  name: Julia Stjerna
  picture: "/assets/blog/authors/julia.jpeg"
ogImage:
  url: "/assets/blog/application-setup/part-01-cover.jpg"
---

## Application from scratch - Setup Part 2b. React Native - Simple Authentication

### Introduction

At the end of this article you'll have a fully functional React Native application with simple authication and routing. We'll continue with a template where we've setup an entire React Native application from scratch with type safety, routing with tabs, testing, formatting, linting, local storage, styling, layouting utils, state management both sync and async and side effects handling. To access this template simply run:
`git clone --depth 1 -b v0.0.1 https://github.com/Tokels/react-native-template.git`.

All code is open source in [this repository](https://github.com/Tokels/react-native-template).

We'll work according to [this workflow](https://juliastjerna.vercel.app/posts/application-setup-part-01) (GitHub organization, GitHub Projects, Project Boards etc.).

You can also visit [this project board](https://github.com/orgs/Tokels/projects/2/views/2) where you will be able to see all the steps and the pull requests belonging to each todo-item.

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

### Step 1.

Cloning template to get a solid starting point:
`git clone --depth 1 -b v0.0.1 https://github.com/Tokels/react-native-template.git`

Of course you don't have to do this, but if you see that I'm using any custom hooks you can find the source code for them in [this release](https://github.com/Tokels/react-native-template/releases/tag/v.0.0.1)

### Step 2. Setup pages

We're using expo router which gives us many possibilities. We want to have two different `dashboard` pages, one that can only be rendered when user is authenticated and one that renders when the user is not authenticated.

Expo router makes it easy to organise and route between your pages. Imagine this folder structure in your project:

app/
├─ auth/
│ ├─ dashboard.tsx
├─ public/
│ ├─ dashboard.tsx
│ ├─ register.tsx
│ ├─ login.tsx
├─ index.tsx

This will give use these endpoints:

https://www.yourdomain.com`/` ---> will render the `./index.tsx` page
https://www.yourdomain.com`/auth/dashboard` ---> will render the `./auth/dashboard.tsx` page
https://www.yourdomain.com`/public/dashboard` ---> will render the `./public/dashboard.tsx` page

And so on.

However, displaying `auth` or `public` in the endpoint is not up to industry standards, and expo makes this available by wrapping folder dir in groups, using syntax `(your_dir_name)`, e.g.:

app/
├─ (auth)/
│ ├─ dashboard.tsx
├─ (public)/
│ ├─ dashboard.tsx
│ ├─ register.tsx
│ ├─ login.tsx
├─ index.tsx

https://www.yourdomain.com`/dashboard` ---> will render either the `./auth/dashboard.tsx` page or the `./public/dashboard.tsx` page

As you can see, we now have two different pages, but only one endpoint, therefore we need to create some kind of logic to determine what page should be rendered. This logic is normally done in the `_layout.tsx` component and expo will automatically render that file first if that file is present. If you want to read more about `layout routes` you can read it in [expos doc](https://docs.expo.dev/router/layouts/). In our case, we'll have multiple layout routes:

app/
├─ (auth)/
│ ├─ \_layout.tsx
│ ├─ dashboard.tsx
├─ (public)/
│ ├─ \_layout.tsx
│ ├─ dashboard.tsx
│ ├─ register.tsx
│ ├─ login.tsx
├─ \_layout.tsx
├─ index.tsx

In our top `layout route` we'll create an `InitialLayout` component that just renders the `Slot` component from expo router:

```javascript
function InitialLayout() {
  return <Slot />;
}
```

This component will be rendered in our default component of the same file, we're doing this cause we eventually want to wrap our InitialLayout with different Providers:

```javascript
export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ToastProvider>
          <TodosProvider>
            <InitialLayout />
          </TodosProvider>
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
```

In our `index.tsx` we'll use the `Redirect` component from `expo-router` to redirect the user to `/(public)/dashboard`:

```javascript
export default function IndexPage() {
  return <Redirect href={"/(public)/dashboard"} />;
}
```

Since `(public)` has a `_layout.tsx` file, this file will first be rendered. This `route layout` will render the `Stack` component from `expo-router`. [Read more about Stack here](https://docs.expo.dev/router/advanced/stack/). We'll make sure that our Stack component renders the `login` screen and the `register screen` as well as the `dashboard` screen. And we will do the same thing for the routes in our `auth layout`.

```javascript
export default function InsideLayout() {
  return (
    <Stack>
      <Stack.Screen name="dashboard" options={{ headerTitle: "Dashboard" }} />
      <Stack.Screen name="login" options={{ headerTitle: "Login" }} />
      <Stack.Screen
        name="register"
        options={{ headerTitle: "Create Account" }}
      />
    </Stack>
  );
}
```

To see the code I added to each file, [view my commit](https://github.com/Tokels/react-native-template/pull/41/commits/864f5833538a5b4789014b15a6bf0d945d7f5330).

### Step 3. Add routing logic

In our top layout route we're now rendering an `<InitialLayout />`. This component will determine how the app will be initialized, in other words: check if we're authenticated or not. For this, we'll use the `useRouter` hook and the `useSegment` hook.

Since we're in need of `imperative routing`, meaning we want to entirely change the endpoint for the user we'll use the `useRouter` hook. You can read more about imperative routing [here](https://docs.expo.dev/router/navigating-pages/#imperative-navigation).

In order for us to determine if we're in the `(auth)` routing group or the `(public)` we can use `segments`, for this we'll use the `useSegments` hook from `expo-router`. [Read more about useSegments here](https://docs.expo.dev/router/reference/hooks/#usesegments).

We'll also need to manage state for a `token` and an `initialized` variable. These does yet not exist, so we'll mock that they exist for now. Later on we'll create our own custom hook `useAuth` to retrieve these state variables. The state logic will be in the `AuthProvider`. But for now, we can just assume that these are either `truthy` or `falsy`. If we assume they're `truthy` we'll be routed to the `(auth)` group, and if we assume they're `falsy` we'll be routed to the `(public)` group.

```javascript
const InitialLayout = () => {
  const [token] = useState("valid-token"); // 👈 will be retrieved by the useAuth hook later and logic handled by provider
  const [initialized] = useState(true); // 👈 will be retrieved by the useAuth hook later and logic handled by provider
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!initialized) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (token && !inAuthGroup) {
      router.replace("/(auth)/dashboard");
    } else if (!token && inAuthGroup) {
      router.replace("/(public)/login");
    }
  }, [token, initialized]);

  return <Slot />;
};
```

[View my commit for this step](https://github.com/Tokels/react-native-template/pull/43/commits/ba0ec06edf161fa1270d6dff9fb9e68d6379c4f9)

### Step 4. the useAuth custom hook and AuthProvider

To create the `useAuth` custom hook we'll use the Context API. The only thing we need to create a Context that can wrap our app (or parts of our app is that is preferred) is this generic template:

```javascript
type Props = {
  <all the props you need>
};

const Context = createContext<Partial<Props>>({});

export function useCustomContext() {
  return useContext(Context);
}

export default function ContextProvider({ children }: { children: ReactElement }) {
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

Since we'll have multiple providers in our app we'll adapt this to our own purpose, and update `_layout` accordingly:

```typescript
type AuthProps = {
  token: string;
  initialized: boolean;
};

const AuthContext = createContext<Partial<AuthProps>>({});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children: ReactElement }) {
  const [token, setToken] = useState("");
  const [initialized, setInitializsed] = useState(false);

  useEffect(() => {
    const loadToken = () => {
      setToken("valid-token");
      setInitialized(true);
    };
    loadToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, initialized }}>
      {children}
    </AuthContext.Provider>
  );
}
```

Later we'll add other props such as `onLogin`, `onRegister` and more complex logic to the `Provider`. The `AuthProvider` will be the keystone of our Authentication, where all the magic happens.

### Step 5. Dummy for onLogin, onLogout and onRegister

WIP
