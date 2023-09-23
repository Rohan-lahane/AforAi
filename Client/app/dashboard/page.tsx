"use client";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AddImage from "@/Components/AddImage";
import SavedImages from "@/Components/SavedImages";
import LanguageSelect from "@/Components/LanguageSelect";

const Dashpage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log(session);

  useEffect(() => {
    if (status === "loading") {
      return; // Wait until the session is loaded
    }

    if (session?.user) {
      router.push("/dashboard");
    } else {
      router.push("/signup");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>hi {session?.user?.name}</p>
      <button onClick={() => signOut()}>Log out</button>
      <LanguageSelect />
      <AddImage />

      <SavedImages />
    </div>
  );
};

export default Dashpage;
