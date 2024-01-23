---
title: "TanStack Query - Todo Provider Example"
excerpt: "This code sets up a comprehensive system for managing todos in a React application. It handles data fetching, mutation, and context management."
coverImage: "/assets/blog/goodie-keyboardstatusprovider/cover.jpg"
date: "2023-12-27T10:45:39.322Z"
author:
  name: Julia Stjerna
  picture: "/assets/blog/authors/julia.jpeg"
ogImage:
  url: "/assets/blog/goodie-keyboardstatusprovider/cover.jpg"
---

## TanStack Query - Todo Provider Example

This code sets up a comprehensive system for managing todos in a React application. It handles data fetching, mutation, and context management, making it easy for components to interact with and display a list of todos from an API. The use of React (TanStack) Query simplifies the process of handling asynchronous operations, and the context provider ensures that the todo-related state is accessible across the application.

```javascript
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { Todo } from '../interface';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTodo, getTodos } from '../todos';
import { useToast } from '../../../providers/ToastProvider';
import axios from 'axios';
import { Todo } from './interface';
const API_URL = '<YOUR TODO API URL>';

export const getTodos = async (): Promise<Todo[]> => {
  const result = await axios.get(`${API_URL}/todos`);
  return result.data.todos;
};

export const createTodo = async (todo: string): Promise<Todo | undefined> => {
  const result = await axios.post(`${API_URL}/todos`, todo);
  return result;
};

type TodosProps = {
  todo: string;
  setTodo: Dispatch<SetStateAction<string>>;
  addTodo: () => void;
  isLoading: boolean;
  isSuccess: boolean;
  todos: Todo[];
};

const TodosContext = createContext<Partial<TodosProps>>({});

export function useTodos() {
  return useContext(TodosContext);
}

export const TodosProvider = ({ children }: { children: ReactElement }) => {
  const [todo, setTodo] = useState('');

  const queryClient = useQueryClient();

  const {
    data: todos,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  const addMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: (todo) => {
      queryClient.setQueryData(['todos'], (oldData: Todo[]) => oldData.unshift(todo!) && oldData);
    }
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
        isLoading,
        isSuccess,
        todos,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

```
