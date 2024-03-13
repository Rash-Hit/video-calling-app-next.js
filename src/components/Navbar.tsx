import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

type Props = {};

function Navbar({}: Props) {
  return (
    <header className="shadow">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between font-medium">
        <Link href={"/"}>New meeting</Link>
        <SignedIn>
            <div className="flex items-center gap-5">
                <Link href={"/meetings"}>Meetings</Link>
                <UserButton />
            </div>
        </SignedIn>
        <SignedOut>
            <SignInButton />
        </SignedOut>
      </div>
    </header>
  );
}

export default Navbar;
