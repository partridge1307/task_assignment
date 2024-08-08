import { User } from "@/server/user";
import Image from "next/image";

export default function UserCard({ user }: { user: User }): React.ReactNode {
  return (
    <div className="flex items-center gap-x-5 px-4 py-2.5 rounded-md xl:rounded-lg dark:bg-zinc-900 shadow-lg shadow-zinc-800/85 hover:-translate-y-1.5 transition-all duration-500 hover:cursor-pointer">
      <div className="relative min-w-14 md:min-w-20 h-14 md:h-20 rounded-full">
        <Image
          sizes="90vw"
          className="object-contain object-center rounded-full"
          fill
          src={user.picture.medium}
          alt={`${user.name.first} ${user.name.last}'s Image`}
        />
      </div>

      <div className="space-y-0.5">
        <h5 className="font-bold line-clamp-2">{`${user.name.title} ${user.name.first} ${user.name.last}`}</h5>
        <p className="text-sm">@{user.login.username}</p>
      </div>
    </div>
  );
}
