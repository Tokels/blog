---
title: "TanStack Query Provider - Clean State Management"
excerpt: "Harnessing the power of clean components is a mantra I live by. Clean components can perform complex tasks gracefully, maintaining code elegance. Before delving into the TanStack Query Provider, let's explore the rich benefits of TanStack Query."
coverImage: "/assets/blog/tanstack-provider/cover.jpg"
date: "2024-01-02T10:45:39.322Z"
author:
  name: Julia Stjerna
  picture: "/assets/blog/authors/julia.jpeg"
ogImage:
  url: "/assets/blog/tanstack-provider/cover.jpg"
---

# TanStack Query Provider - Clean State Management

Harnessing the power of clean components is a mantra I live by. Clean components can perform complex tasks gracefully, maintaining code elegance. Before delving into the TanStack Query Provider, let's explore the rich benefits of TanStack Query.

## Why TanStack Query?

1. **Declarative Data Fetching:**
   TanStack Query embraces a declarative approach to data fetching, providing developers with a straightforward means to express their data requirements. The simple and intuitive syntax allows developers to define the data needed for a specific component or view, simplifying the codebase and enhancing readability.

```javascript
const { data } = useQuery("exampleQuery", fetchExampleData);
```

2. **Automatic Caching and Data Normalization:**
   A standout feature of TanStack Query is its built-in caching mechanism. This intelligent caching system not only boosts application performance by minimizing unnecessary network requests but also ensures a consistent and responsive UI.

   Additionally, TanStack Query incorporates data normalization, structuring data to reduce redundancy and improve data consistency. This minimizes data duplication and ensures seamless reflection of changes across various components.

```javascript
const { data } = useQuery("exampleQuery", fetchExampleData, {
  select: (data) => data.items,
});
```

3. **Optimistic Updates and Offline Support:**
   TanStack Query empowers developers to implement optimistic updates effortlessly. UI changes are applied optimistically before server confirmation, resulting in a smoother and more responsive user experience. This proves invaluable in scenarios where immediate reflection of user actions, like form submissions, is crucial.

   Moreover, TanStack Query excels in offline support, enabling applications to function seamlessly even when users are offline. The library efficiently manages data synchronization when the network is restored, ensuring a consistent experience across diverse network conditions.

```javascript
const { mutate } = useMutation(updateData, {
  onMutate: (variables) => {
    // Optimistic update logic here
  },
});
```

4. **Server-Side Rendering (SSR) and React Native Support:**
   TanStack Query is designed with server-side rendering (SSR) in mind, providing out-of-the-box support for rendering components on the server. This ensures that applications leveraging TanStack Query achieve optimal performance and SEO benefits through SSR.

   Furthermore, TanStack Query extends its support to React Native, allowing developers to employ the same state management solution across web and mobile platforms. This cross-platform compatibility reduces the learning curve and promotes code reuse, leading to more efficient development workflows.

```javascript
const { data } = useQuery("exampleQuery", fetchExampleData, {
  ssr: true,
});
```

## TanStack Query Provider

Consider this example of a component wrapped by a TanStack Query Provider. As evident, you gain access to various sophisticated features by utilizing the custom hook `useTodos`.

### The Clean Component

```javascript
export default function Todos() {
  const { todos, addTodo, todo, setTodo } = useTodos();
  return (
    <View>
      <Text>Todos</Text>
      <TextInput placeholder="New Todo" onChangeText={setTodo} value={todo} />
      <Button title="Add Todo" onPress={addTodo} />
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View>
            <Text>{item.todo}</Text>
          </View>
        )}
      />
    </View>
  );
}
```

### The Provider

And all you need for above component is the below provider, this does not include the full CRUD, but make it an excercise for yourself and add the delete and update feature too! I promise you it's easy.

```javascript
type TodosProps = {
  todo: string;
  setTodo: Dispatch<SetStateAction<string>>;
  addTodo: () => void;
  status: Status;
  todos: Todo[];
};

const TodosContext = createContext<Partial<TodosProps>>({});

export function useTodos() {
  return useContext(TodosContext);
}

export const TodosProvider = ({ children }: { children: ReactElement }) => {
  const [todo, setTodo] = useState('');

  const queryClient = useQueryClient();

  const { data: todos, status } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  const addMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: (todo) => {
      queryClient.setQueryData(['todos'], (oldData: Todo[]) => oldData.unshift(todo!) && oldData);
    },
  });

  const addTodo = () => {
    addMutation.mutate(todo);
  };

  return (
    <TodosContext.Provider
      value={{
        todo,
        setTodo,
        addTodo,
        status,
        todos,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
```

## Conclusion

In conclusion, TanStack Query stands out as a powerful and versatile solution for state management in modern web applications. Its declarative data fetching, automatic caching, support for optimistic updates and offline functionality, combined with its compatibility with SSR and React Native, collectively contribute to a smoother development experience.
