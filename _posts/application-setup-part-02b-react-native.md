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

[Here's my commit for this step](https://github.com/Tokels/react-native-template/pull/45/commits/2556cadfae8571608f559960766f20b1937d1e9a)

### Step 5. Dummy for handleLogin, handleLogout and handleRegister

We're taking baby steps, each pull request has it's own purpose, and don't worry, we'll style it later once the logic is in place.

For this step we'll add `handleLogin`, `handleLogout` and `handleRegister`.

Our baby steps:

1. We want `handleLogin` to call an `authorize` function placed in our `api` folder. This function just returns a string that says: 'valid-token'. The result of this function will update the `token` state variable.
2. We want `handleLogout` to reset the `token` state variable to an empty string
3. For now, the `handleRegister` will behave like the `handleLogin` function

Add the three functions to your provider and specify them in your `AuthProps`:

```javascript
const handleLogin = () => {
  const token = authorize();
  setToken(token);
};

const handleLogout = () => {
  setToken("");
};

const handleRegister = () => {
  const token = authorize();
  setToken(token);
};
```

Remove the `setToken('valid-token')` from `loadToken`, we want to have a `Button` on our `Login` page that calls the `handleLogin` function instead.

Create the `authorize` function, I put it in `src/api/Auth/index.ts`. This will handle some external API calls later to give us a proper JWT.

```javascript
export const authorize = () => "valid-token";
```

Add `Button`s to our `register`, `login` and `dashboard` pages for `Login`, `Logout` and `Register`. I also changed the router layouting from `Stack` to `Tabs` in my `(public)/_layout.tsx` to be able to navigate via tabs instead.

[View my full commit here](https://github.com/Tokels/react-native-template/commit/9cc0a17d1fb0b478d4bd9655a3d4e3d0b50349d5)

### Step 6. Create TokenProvider with Token Query and Mutations

Now, to keep our components as clean as possible, and that goes for our Context Components as well, we'll do some separation of concerns. E.g. the `token` state variable is determined by async API calls to an authentication server. Therefore, we could create a TokenProvider, similar to the [TodosProvider](https://juliastjerna.vercel.app/posts/todos-provider-tanstack-query), using TanStack Query to have one provider that handles the logic and async calls for the JWT token.

Let's start with adding the query functions: initialize, login, refresh, register and logout. These will make API calls in the future to retrieve the valid token, but for now, we'll just mock a resolved promise that returns 'valid-token' as a string.

```javascript
export const initialize = async () => {
  const token = await secureStoreGetValueFor("token");
  console.log(token);
  return token;
};

export const login = async (): Promise<string> => {
  const token = await Promise.resolve("valid-token"); // Will be replaced with API call
  await secureStoreSave("token", token);
  return token;
};

export const refresh = async () => {
  const token = await Promise.resolve("valid-token"); // Will be replaced with API call
  await secureStoreSave("token", token);
  return token;
};

export const register = async () => {
  const token = await Promise.resolve("valid-token"); // Will be replaced with API call
  await secureStoreSave("token", token);
  return token;
};

export const logout = async () => {
  await secureStoreDelete("token");
};
```

Next step is to create the query and the mutations for these in a provider with variables that we can access via a useToken hook:

```javascript
type TokenProps = {
  token: string,
  loginToken: () => void,
  deleteToken: () => void,
  refreshToken: () => void,
  registerToken: () => void,
};

const TokenContext = createContext < Partial < TokenProps >> {};

export function useToken() {
  return useContext(TokenContext);
}

export const TokenProvider = ({ children }: { children: ReactElement }) => {
  const queryClient = useQueryClient();

  const { data: token } = useQuery({
    queryKey: ["token"],
    queryFn: initialize,
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (token) => {
      queryClient.setQueryData(["token"], token);
    },
  });

  const loginToken = () => {
    loginMutation.mutate();
  };

  const deleteMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["token"], "");
    },
  });

  const deleteToken = () => {
    deleteMutation.mutate();
  };

  const refreshMutation = useMutation({
    mutationFn: refresh,
    onSuccess: (token) => {
      queryClient.setQueryData(["token"], token);
    },
  });

  const refreshToken = () => {
    refreshMutation.mutate();
  };

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (token) => {
      queryClient.setQueryData(["token"], token);
    },
  });

  const registerToken = () => {
    registerMutation.mutate();
  };

  return (
    <TokenContext.Provider
      value={{
        token,
        loginToken,
        deleteToken,
        refreshToken,
        registerToken,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};
```

Now, in our `AuthProvider`, we can use the mutations like so:

```javascript
  const { token, loginToken, deleteToken, registerToken } = useToken();

  const handleLogin = () => {
    loginToken!();
  };

  const handleLogout = () => {
    deleteToken!();
  };

  const handleRegister = () => {
    registerToken!();
  };
```

Don't forget to wrap your components with this provider, including wrapping the AuthProvider!

[View my full commit here](https://github.com/Tokels/react-native-template/commit/70b246f46ea4041bb6713d4b2c0c28ec340e8f83)

### Step 7a. Add logic for refresh token, part 1

We want our code to check if the token that is saved in SecureStore has expired or not, and we also want to change the `token` variable from `string` to `object`.

For this step, it's easier if you view it via [this commit](https://github.com/Tokels/react-native-template/pull/52/files#diff-12f2da7a3b67c69cba2096667591d0305bc8554dc9d0c1b7c79f7bc146830366) so that you can compare with the previous step.

What we want to do is to add a variable to our `token`. In previous step, our `token` was just a `string`. For this issue, we want the `token` to be an object including some variables for us to use for the lofic: `accessToken`, `expires` etc. We'll start with an object like so:

```javascript
const token = {
  accessToken: "valid-token",
  expires: Date.now() + 86400000,
};
```

The `expires` value is in milliseconds, and we're adding 24 hours.

We want our server, or an API, to supply us with the data, but for now, we'll mock a Promise by just using `Promise.resolve(token)`.

When we initialize the app we want to check the token and if it's valid.

### Sidestep, JWT in real life

In previous example, this could happen:

E.g. Jane will login 25th of January 09.54. Her access token will be valid until 26th of January 10.54.

The 26th of January, 11.22, Jane opens the app again and gets frustrated that she needs to login again even though she feels like she just used the application.

Therefore, we need some changes in our architecture for this application.

We want the `access token` to only be valid for a short amount of time and we want to introduce a `refresh token`. The idea is that the client is going to try to make a request using the `access token`, the server is going to block the request with a `401 unauthorized`, but since a `refresh token` hasn't expired we'll make another request to the server with the `refresh token`. The server will respond with a new `access token` so that the client can try to make the request again.

Let's add to our JWT object:

```javascript
const token = {
  accessToken: "valid-token",
  accessTokenExpires: Date.now() + 600000 // 10 min
  refreshToken: "valid-token",
  refreshTokenExpires: Date.now() + 2629746000 // 1 month
};
```

There's a way to do what follows with `axios interceptor`, but before doing that lets understand how it would be done without it.

Let's mock our requests, a bit of sudo coding, but just so you can understand what's happening:

```javascript
const getUserProfile = (token) => {
  const config = {
    headers: { Authorization: `Bearer ${TOKEN}` },
  };

  const profile = axios.get(`${API_URL}/profile`, config);

  return profile;
};
```

```javascript
const anyRequest = () => {
  try {
    const token = // get from where you have stored it on the client, e.g. in cookies, localstorage, securestore
    const profile = getUserProfile(token);
    setUserProfile(profile);
  } catch (err) {
    if (err.status === 401) {
      const refreshTokenExpires = // get from where you have stored it on the client
      if (refreshTokenExpires < Date.now()) {
        // redirect to login page
      }
      const token = axios.post(`${API_URL}/refresh_token`, refreshToken);
      // set token where you have stored it on the client
      const profile = getUserProfile(token);
      setUserProfile(profile);
    }
  }
};
```

Using axios, you can use `interceptors` to do this for you automatically. But since we are creating a simple authentication system now for this release we will keep the architecture to only have an access token that expires after 24 hours. In real life, this access token will probably expires within minutes, and we would have a refresh token that updates the access token when we're making api calls.
