"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { initFirebase } from "@/firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Link from "next/link";

export default function ViewPoem() {
  const router = usePathname();
  const id = router.split("/")[2];
  const app = initFirebase();
  const firestore = getFirestore(app);
  const [user, setUser] = useState() as any;

  useEffect(() => {
    async function fetchUser() {
      if (id) {
        const docRef = doc(firestore, "users", id);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data() as any;
        if (docSnap.exists()) {
          setUser(data);
        } else {
          console.log("No such document!");
        }
      }
    }

    fetchUser();
  }, [id]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-row justify-between border-b border-gray-300 pb-2 mb-6 ">
        <h1 className="font-semibold text-3xl "> Poem Creations</h1>
        <Link
          href="/create"
          className="rounded-md bg-gray-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        >
          Create Another
        </Link>
      </div>
      {user && (
        <div className="">
          {user?.poems.map((poem: any) => {
            const date = poem.dateCreated.toDate().toLocaleDateString("en-US");
            return (
              <div className="mb-8">
                <div className="flex flex-row gap-4 justify-end mb-2">
                  <h3 className="font-medium">{user.name},</h3>
                  <p className="text-gray-700">{date}</p>
                </div>
                <p className="text-gray-600">{poem.poem}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
