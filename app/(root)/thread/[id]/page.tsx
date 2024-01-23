import ThreadCard from "@/components/cards/ThreadCard";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import Comment from "@/components/forms/Comment";
const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  const thread = await fetchThreadById(params.id);
 return(<section className="relative">
    <div>
      <ThreadCard
        key={thread._id}
        id={thread._id}
        currentUserId={user?.id || ""}
        parentId={thread?.parentId}
        content={thread?.text}
        author={thread?.author}
        community={thread?.community}
        createdAt={thread?.createdAt}
        comment={thread?.children}
      />
    </div>
    <div className="mt-7">
<Comment
threadId={JSON.stringify(thread._id)}
currentUserImg={userInfo.image}
currentUserId={JSON.stringify(userInfo._id)}
/>
    </div>
    <div className="mt-10">
      {thread?.children?.map((childItem:any, index:number) => (
        <>
        <ThreadCard
          key={childItem._id}
          id={childItem._id}
          currentUserId={user?.id || ""}
          parentId={childItem?.parentId}
          content={childItem?.text}
          author={childItem?.author}
          community={childItem?.community}
          createdAt={childItem?.createdAt}
          comment={childItem?.children}
          isComment
        />
        {index < thread.children.length - 1 && <div style={{ margin: '10px 0' }}></div>}
  </>
      )
      )}

    </div>
  </section>
) };
export default Page;
