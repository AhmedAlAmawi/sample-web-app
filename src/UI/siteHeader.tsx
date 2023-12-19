"use client";
import { initFirebase } from "@/firebase";
import { useRouter } from "next/navigation";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import ProfileDropdown from "./profileDropDown";
import Button from "./button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function SiteHeader() {
  const router = useRouter();
  const app = initFirebase();
  const auth = getAuth(app);
  const signOutRequested = () => auth.signOut();
  const provider = new GoogleAuthProvider();
  const [user] = useAuthState(auth);
  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // if (user) {
    //   goToAccount();
    // }
  };
  const goToAccount = () => {
    router.push("/create");
  };

  return (
    <header className="block inset-x-0 z-10 top-0">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-9 w-auto" src="/box.svg" alt="" />
          </Link>
        </div>
        <div className="flex flex-1 justify-end items-center gap-4">
          <Link
            href="/create"
            className="rounded-md bg-gray-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            Create Your Invoice
          </Link>
          {user ? (
            <ProfileDropdown user={user} signOutRequested={signOutRequested} />
          ) : (
            <div>
              <Button round color={"secondary"} onClick={signIn}>
                <span>Sign In</span> <ArrowRightIcon className={"h-4"} />
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
