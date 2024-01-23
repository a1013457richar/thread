import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import ProfileHeader from "@/components/ui/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadTabs from "@/components/shared/ThreadTabs";
import { fetchUsers } from "@/lib/actions/user.actions";
import UserCard from "@/components/cards/UserCard";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  //fetch user
  const result = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 20,
  });
  

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      {/* search box */}
      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">NO users</p>
        ) : (
          <>
            {result.users.map((person) => (
              <UserCard 
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imageUrl={person.image}
                personType='User'

              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Page;
