import { getProfileById } from "@/actions/auth/user.action";
import { sleep } from "@/lib/utils";
import { permanentRedirect } from "next/navigation";
import React from "react";
import TodoContainer from "./components/TodoContainer";

interface SharePageProps {
  params: { user_id: string };
  searchParams: {};
}

const SharePage = async (props: SharePageProps) => {
  const userId = props?.params?.user_id;
  const profile = await getProfileById({ serverComponent: true, userId });
  const userName = profile?.full_name;
  console.log("userName is ", userName);

  if (!profile) permanentRedirect("/");
  return (
    <div>
      <TodoContainer sharedUserFullName={userName ?? ""} ownerUserId={userId} />
    </div>
  );
};

export default SharePage;
