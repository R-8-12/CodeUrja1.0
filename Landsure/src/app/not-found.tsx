import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Variable } from "lucide-react";

function notfound() {
  return (
    <div className="flex items-center justify-center w-screen h-screen flex-col">
      <Variable className="size-20 animate-spin text-zinc-800 dark:text-zinc-100" />
      <h1 className="text-4xl mt-4 text-zinc-800 dark:text-zinc-50 font-medium">
        404 - Page Not Found
      </h1>{" "}
      <br />
      <p className="text-lg mb-8 text-zinc-400">
        {" "}
        Oops! The page you&apos;re looking for doesn&apos;t exit or has been
        moved
      </p>
      <Link href="/" key="home" className="mb-6">
        <Button
          variant={"secondary"}
          className="hover:bg-zinc-200 dark:hover:bg-zinc-600"
        >
          Go back home
        </Button>
      </Link>
    </div>
  );
}

export default notfound;
