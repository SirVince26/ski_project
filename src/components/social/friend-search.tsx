"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchProfiles, addFriendById } from "@/app/actions/social";
import { Search, UserPlus, Loader2 } from "lucide-react";

interface SearchResult {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  home_location: string | null;
}

export function FriendSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSearch = async () => {
    if (query.length < 2) return;
    setSearching(true);
    setMessage(null);
    const { profiles, error } = await searchProfiles(query);
    setResults(profiles as SearchResult[]);
    if (error) setMessage({ type: "error", text: error });
    setSearching(false);
  };

  const handleAdd = (friendId: string) => {
    setAddingId(friendId);
    setMessage(null);
    startTransition(async () => {
      const result = await addFriendById(friendId);
      if (result.error) {
        setMessage({ type: "error", text: result.error });
      } else {
        setMessage({ type: "success", text: "Friend request sent!" });
        setResults(prev => prev.filter(p => p.id !== friendId));
      }
      setAddingId(null);
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search by name..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSearch()}
        />
        <Button size="icon" variant="outline" onClick={handleSearch} disabled={searching || query.length < 2}>
          {searching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
        </Button>
      </div>

      {message && (
        <p className={`text-sm ${message.type === "error" ? "text-destructive" : "text-green-600 dark:text-green-400"}`}>
          {message.text}
        </p>
      )}

      {results.length > 0 && (
        <div className="space-y-2">
          {results.map(profile => (
            <div key={profile.id} className="flex items-center justify-between p-2 rounded-lg border bg-card">
              <div>
                <p className="text-sm font-medium">{profile.full_name || "No name"}</p>
                {profile.home_location && (
                  <p className="text-xs text-muted-foreground">{profile.home_location}</p>
                )}
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleAdd(profile.id)}
                disabled={addingId === profile.id || isPending}
              >
                {addingId === profile.id ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <UserPlus size={14} />
                )}
              </Button>
            </div>
          ))}
        </div>
      )}

      {results.length === 0 && query.length >= 2 && !searching && (
        <p className="text-xs text-muted-foreground text-center py-2">No users found.</p>
      )}
    </div>
  );
}
