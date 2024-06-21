"use client";
import React, { useState } from "react";
import { IoShareSocialOutline, IoSearchOutline } from "react-icons/io5";
import { useCopyToClipboard } from "usehooks-ts";
import TodoListItem from "./TodoListItem";

const TodoList = ({
  sharedUserFullName = "",
  ownerUserId = "",
  loading = false,
  todoListData = [],
  isReadOnly = false,
  onUpdate = (id, updatedContent) => {},
  onCreate = () => {},
  onDelete = (id) => {},
  onSearch = (terms) => {},
}) => {
  const [userSearchInput, setUserSearchInput] = useState("");
  const [copiedText, copy] = useCopyToClipboard();
  const handleCopy = () => {
    const sharedLink = `${"todoList 공유할 링크"}/share/${ownerUserId}`;
    copy(sharedLink)
      .then(() => {
        window.alert(`공유링크 복사 완료: ${sharedLink}`);
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };

  const handleSearchEnd = () => {
    onSearch(userSearchInput);
    setUserSearchInput("");
  };

  return (
    <section className="min-h-[70vh] bg-[#69CFCF]">
      <div className="w-full mx-auto max-w-[800px] p-[20px]">
        <article className="flex flex-row justify-between items-center">
          <div className="font-bold text-[32px]">
            {sharedUserFullName && <div>{sharedUserFullName}</div>}
            Things to do:
          </div>
          {ownerUserId && (
            <div
              onClick={() => handleCopy()}
              className="font-bold text-[20px] flex flex-row items-center cursor-pointer"
            >
              Share
              <IoShareSocialOutline />
            </div>
          )}
        </article>
        {!isReadOnly && (
          <article className="flex flex-col sm:flex-row gap-4 mt-8">
            <div className="flex flex-1 h-[60px]">
              <input
                value={userSearchInput}
                onChange={(e) => setUserSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearchEnd();
                }}
                className="p-4 flex-1 bg-[#F7CB66] border-black rounded-l-2xl font-bold"
              ></input>
              <div
                onClick={() => handleSearchEnd()}
                className="w-[60px] flex justify-center items-center bg-black rounded-r-2xl cursor-pointer"
              >
                <IoSearchOutline size={40} color="#fff" />
              </div>
            </div>
            <div
              onClick={onCreate}
              className="w-[200px] h-[60px] flex justify-center items-center bg-[#7EBB95] border border-black rounded-2xl font-bold cursor-pointer text-[20px]"
            >
              New Task
            </div>
          </article>
        )}

        <div className="h-[2px] my-10 bg-black" />
        {todoListData?.length >= 1 ? (
          <ul className="flex flex-col gap-6">
            {(todoListData ?? []).map((todo) => {
              return (
                <TodoListItem
                  key={todo?.id}
                  todo={todo}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                />
              );
            })}
          </ul>
        ) : (
          <div>{loading ? "Loading..." : "Empty!"}</div>
        )}
      </div>
    </section>
  );
};

export default TodoList;
