import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import { getActivity } from "@/lib/actions/user.actions";
import Link from "next/link";
import Image from "next/image";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  
  //fetch user
  const activity = await getActivity(userInfo._id);
  
  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>
      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((item, index) => (
              <Link href={`/thread/${item.parentId}}`} key={item._id} >
                <article className="activity-card">
                    <Image
                      src={item.author.image}
                      alt="profile picture"
                      width={20}
                      height={20}
                      className="rounded-full object-cover"
                      />

                      <p className="!text-small-regular text-light-1">
                        <span className="mr-1 text-primary-500">
                            {item.author.name}
                        </span>{""}
                        replied to your thread
                      </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="!text-base-regular text-light-3">No Activity</p>
        )}
      </section>
    </section>
  );
};
export default Page;
