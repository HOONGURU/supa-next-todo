import { sleep } from "@/lib/utils";
import React from "react";
import TodoContainer from "./components/TodoContainer";

const Page = async () => {
  // throw new Error('Custom error');
  // await sleep(1500);
  return (
    <div>
      <TodoContainer />
    </div>
  );
};

export default Page;
