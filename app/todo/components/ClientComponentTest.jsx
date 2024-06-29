"use client";
import { getTodos } from "@/actions/todo/todo.action";

const ClientComponentTest = () => {
  const handleClick = async () => {
    const result = await getTodos(); //ClientSide rendering 시에 Server Actions를 부름
    console.log("handleClick result ", result);
  };
  return (
    <div>
      <button onClick={handleClick}>Test server actions</button>
    </div>
  );
};

export default ClientComponentTest;

//1. ServerActions + Router Handler
//2. ServerActions + SSR(Server Side Rendering)
//3. ServerActions + CSR(Client Side Rendering)
