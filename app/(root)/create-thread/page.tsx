import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import PostThread from "@/components/forms/PostThread";

async function Page() {
  const user = await currentUser();

  if (!user) return null;
  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  // 確保 userId 是一個簡單的值，比如字符串或數字
  const userId = userInfo._id.toString();

  return (
    <>
      <h1 className="head-text">
        Create Thread
        <PostThread userId={userId} /> {/* 直接傳遞 userId */}
      </h1>
    </>
  );
}

export default Page;

