import { useMemo } from "react";
import type { UserInfo } from "firebase/auth";
import Link from "next/link";

import {
  Cog8ToothIcon,
  ArrowLeftOnRectangleIcon,
  Squares2X2Icon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown";

import ProfileAvatar from "./profileAvatar";

const ProfileDropdown: React.FCC<{
  user: Maybe<UserInfo>;
  signOutRequested: () => void;
}> = ({ user, signOutRequested }) => {
  const signedInAsLabel = useMemo(() => {
    return user?.email ?? user?.phoneNumber;
  }, [user]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={
          "flex cursor-pointer items-center space-x-2 focus:outline-none"
        }
      >
        <ProfileAvatar user={user} />

        <ChevronDownIcon className={"h-4"} />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={"!min-w-[15rem]"}
        collisionPadding={{ right: 20 }}
      >
        <DropdownMenuItem
          className={"!h-10 rounded-none py-0"}
          clickable={false}
        >
          <div
            className={"flex flex-col justify-start truncate text-left text-xs"}
          >
            <div className={"text-gray-500 dark:text-gray-400"}>
              Signed in as
            </div>

            <div>
              <span className={"block truncate"}>{signedInAsLabel}</span>
            </div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link
            href="/"
            className={"flex h-full w-full items-center space-x-2"}
          >
            <Squares2X2Icon className={"h-5"} />
            <span>Dash</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link
            href={"/settings/profile"}
            className={"flex h-full w-full items-center space-x-2"}
          >
            <Cog8ToothIcon className={"h-5"} />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          role={"button"}
          onClick={signOutRequested}
          className={"flex !cursor-pointer items-center space-x-2"}
        >
          <ArrowLeftOnRectangleIcon className={"h-5"} />

          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
