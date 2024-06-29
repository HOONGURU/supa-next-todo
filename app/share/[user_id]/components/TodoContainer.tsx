"use client";

import TodoList from "@/components/ui/TodoList";
import useTodosController from "../hooks/useTodosController";

interface TodoContainerProps {
  sharedUserFullName?: string;
  ownerUserId?: string;
}

const TodoContainer = ({
  sharedUserFullName,
  ownerUserId,
}: TodoContainerProps) => {
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
        sharedUserFullName={sharedUserFullName}
        ownerUserId={ownerUserId}
        loading={loading}
        todoListData={todos}
        isReadOnly={true}
        onUpdate={onUpdateTodos}
        onCreate={onCreateEmptyTodos}
        onDelete={onDeleteTodos}
        onSearch={onSearchTodos}
      />
    </div>
  );
};

export default TodoContainer;
