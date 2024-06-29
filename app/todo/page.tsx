import { sleep } from "@/lib/utils";
import React from "react";
import ClientComponentTest from "./components/ClientComponentTest";
import { pingAction } from "@/actions/ping/ping.action";
import { getTodos } from "@/actions/todo/todo.action";

const page = async () => {
  console.log(">> SSR start");

  const result = await getTodos(); //Serverside rendering + Server Actions의 조합으로 todo list 가져옴

  console.log(">> SSR end");

  return (
    <div>
      todo page {JSON.stringify(result)}
      <ClientComponentTest />
    </div>
  );
};

export default page;
