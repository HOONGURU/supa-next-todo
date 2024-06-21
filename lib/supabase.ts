import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export const createServerSideClient = async () => {
  const cookieStore = cookies();

  //ServerActions, RouterHandler
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key) => cookieStore.get("key")?.value,
        set: (key, value, options) => {
          cookieStore.set(key, value, options);
        },
        remove: (key, options) => {
          cookieStore.set(key, "", options);
        },
      },
    }
  );
};

//RSC
export const createServerClientRSC = async () => {};
