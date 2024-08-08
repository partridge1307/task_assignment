import { fetchUsers } from "@/server/user";
import { notFound } from "next/navigation";
import UserCard from "./UserCard";
import dynamic from "next/dynamic";

const Pagination = dynamic(() => import("./Pagination"), {
  ssr: false,
  loading: () => (
    <div className="fixed bottom-0 w-screen h-11 md:h-[52px] flex justify-center items-center gap-x-2 bg-zinc-900" />
  ),
});

export default async function Home({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  let page = Number(searchParams["page"] || "1");
  let results = Number(searchParams["results"] || "10");

  const users = await fetchUsers(page, results);

  if (!users) return notFound();

  page = users.info.page;
  results = users.info.results;

  users.results.sort((a, b) => {
    const aFullname = `${a.name.title} ${a.name.first} ${a.name.last}`;
    const bFullname = `${b.name.title} ${b.name.first} ${b.name.last}`;

    if (aFullname > bFullname) {
      return 1;
    }
    if (aFullname < bFullname) {
      return -1;
    }
    if (a.login.username > b.login.username) {
      return 1;
    }
    if (a.login.username < b.login.username) {
      return -1;
    }
    return 0;
  });

  return (
    <>
      <main className="mb-20 mx-2 md:mx-4">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-x-6 gap-y-6 md:gap-y-8">
          {users.results.map((user) => (
            <UserCard key={user.login.uuid} user={user} />
          ))}
        </div>
      </main>
      <Pagination initialPage={page} initialResult={results} />
    </>
  );
}
