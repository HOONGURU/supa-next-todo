"use client";

import TodoList from "@/components/ui/TodoList";
import useTodosController from "../hooks/useTodosController";

interface TodoContainerProps {
  ownerUserId?: string;
}

const TodoContainer = ({ ownerUserId }: TodoContainerProps) => {
  const {
    loading,
    todos,
    onCreateEmptyTodos,
    onSearchTodos,
    onDeleteTodos,
    onUpdateTodos,
  } = useTodosController(ownerUserId);

  return (
    <div>
      <TodoList
        ownerUserId={ownerUserId}
        loading={loading}
        todoListData={todos}
        isReadOnly={false}
        onUpdate={onUpdateTodos}
        onCreate={onCreateEmptyTodos}
        onDelete={onDeleteTodos}
        onSearch={onSearchTodos}
      />
    </div>
  );
};

export default TodoContainer;
