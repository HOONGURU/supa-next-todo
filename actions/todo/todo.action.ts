"use server";

import { createServerSideClient } from "@/lib/supabase";

//todoList 가져오기

export const getTodos = async () => {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from("todos_with_rls")
    .select("*")
    .is("deleted_at", null)
    .order("id", {
      ascending: false,
    });
  return result.data;
};

//todoList 가져오기 + by ID
export const getTodosById = async (id: number) => {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from("todos_with_rls")
    .select("*")
    .is("deleted_at", null)
    .eq("id", id);

  return result.data;
};

//todoList 가져오기 + by UserID
export const getTodosByUserId = async (userId: string) => {
  const supabase = await createServerSideClient(true);
  const result = await supabase
    .from("todos_with_rls")
    .select("*")
    .is("deleted_at", null)
    .eq("user_id", userId);

  return result.data;
};

export const getTodoBySearch = async (terms: string) => {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from("todos_with_rls")
    .select("*")
    .is("deleted_at", null)
    .like("content", `%${terms}%`)
    .order("id", { ascending: false })
    .limit(500);

  return result.data;
};

//TodoList 생성하기
export const createTodos = async (content: string) => {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from("todos_with_rls")
    .insert({ content })
    .select();
  return result.data;
};

//TodoList 업데이트
export const updateTodos = async (id: number, content: string) => {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from("todos_with_rls")
    .update({ content, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select();
  return result.data;
};

//TodoList softDelete
export const deleteTodosSoft = async (id: number) => {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from("todos_with_rls")
    .update({
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select();

  return result.data;
};

//TodoList hardDelete
// export const deleteTodosHard = async (id: number) => {
//   const supabase = await createServerSideClient();
//   const result = await supabase.from("todos_with_rls").delete().eq("id", id);

//   return result.data;
// };
