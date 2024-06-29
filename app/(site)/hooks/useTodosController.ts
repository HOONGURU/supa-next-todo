import {
  createTodos,
  deleteTodosSoft,
  getTodoBySearch,
  getTodos,
  getTodosByUserId,
  updateTodos,
} from "@/actions/todo/todo.action";
import { useCallback, useEffect, useState } from "react";
import { Database } from "@/types/supabase";

type TodoDto = Database["public"]["Tables"]["todos_no_rls"]["Row"];

const useTodosController = (ownerUserId = "") => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<TodoDto[]>([]);

  const onGetTodos = useCallback(async () => {
    setLoading(true);
    try {
      const resultTodos = await getTodosByUserId(ownerUserId);
      if (resultTodos) {
        setTodos(resultTodos);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [ownerUserId]);

  useEffect(() => {
    onGetTodos();
  }, [onGetTodos]);

  //비어있는 Todo 생성
  const onCreateEmptyTodos = async () => {
    await createTodos("");
    onGetTodos();
  };

  //Todo Update
  const onUpdateTodos = async (id: number, content: string) => {
    await updateTodos(id, content);
    await onGetTodos();
  };

  //Delete Todo
  const onDeleteTodos = async (id: number) => {
    await deleteTodosSoft(id);
    await onGetTodos();
  };

  //Search Todos
  const onSearchTodos = async (terms: string) => {
    if (terms) {
      const todoResult = await getTodoBySearch(terms);
      if (todoResult) setTodos(todoResult);
    } else {
      await onGetTodos();
    }
  };

  return {
    loading,
    todos,
    onCreateEmptyTodos,
    onUpdateTodos,
    onDeleteTodos,
    onSearchTodos,
  };
};

export default useTodosController;
