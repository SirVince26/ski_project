"use client";

import { useState, useTransition } from "react";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { markNotificationRead, markAllNotificationsRead } from "@/app/actions/social";
import { Button } from "@/components/ui/button";

interface NotificationItem {
  id: string;
  title: string;
  body: string | null;
  link: string | null;
  read: boolean;
  created_at: string;
}

export function NotificationBell({ notifications }: { notifications: NotificationItem[] }) {
  const unreadCount = notifications.filter(n => !n.read).length;
  const [isPending, startTransition] = useTransition();

  const handleMarkAllRead = () => {
    startTransition(async () => {
      await markAllNotificationsRead();
    });
  };

  const handleClickNotification = (id: string) => {
    startTransition(async () => {
      await markNotificationRead(id);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative rounded-full hover:bg-muted p-2 outline-none">
        <Bell className="h-5 w-5 text-muted-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-2">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="text-xs h-auto py-1" onClick={handleMarkAllRead} disabled={isPending}>
              Mark all read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="px-4 py-6 text-center text-sm text-muted-foreground">
            No notifications yet.
          </div>
        ) : (
          notifications.slice(0, 10).map(n => (
            <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-0.5 cursor-pointer" onClick={() => {
              if (!n.read) handleClickNotification(n.id);
              if (n.link) window.location.href = n.link;
            }}>
              <div className="flex items-center gap-2 w-full">
                {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                <span className={`text-sm font-medium ${n.read ? "text-muted-foreground" : ""}`}>{n.title}</span>
              </div>
              {n.body && <p className="text-xs text-muted-foreground pl-3.5">{n.body}</p>}
              <p className="text-[10px] text-muted-foreground/60 pl-3.5">
                {new Date(n.created_at).toLocaleDateString()}
              </p>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
