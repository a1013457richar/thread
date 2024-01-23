import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "@/components/cards/ThreadCard";
import { ObjectId } from 'mongodb';

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}
interface Result {
  name: string;
  image: string;
  id: string;
  threads: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    community: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    children: {
      author: {
        image: string;
      };
    }[];
  }[];
}
const ThreadTabs = async ({ currentUserId, accountId, accountType }: Props) => {
  //fetchuserpost
  // let result: Result;
//   console.log("here" + accountId);
  let accountIdObject = new ObjectId(accountId);
  let result = await fetchUserPosts(accountIdObject);
  if (!result) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result?.threads?.map((thread: any) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread?.parentId}
          content={thread?.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
          community={thread?.community} //todo
          createdAt={thread?.createdAt}
          comment={thread?.children}
          isComment
        />
      ))}
    </section>
  );
};
export default ThreadTabs;
