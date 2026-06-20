"use client";

import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { logout } from "@/app/actions/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircle } from "lucide-react";

export function UserMenu({ user }: { user: User | null }) {
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login" className={buttonVariants({ variant: "ghost" })}>Login</Link>
        <Link href="/signup" className={buttonVariants()}>Sign Up</Link>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full hover:bg-slate-100 p-2 outline-none">
        <UserCircle className="h-6 w-6 text-slate-600" />
        <span className="sr-only">Toggle user menu</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/dashboard" className="w-full">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/favorites" className="w-full">Favorites</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/trips" className="w-full">My Trips</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/profile" className="w-full">Profile Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
          onClick={async () => {
            await logout();
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
