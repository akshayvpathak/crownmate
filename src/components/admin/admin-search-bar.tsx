"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminSearchBar({
  value,
  onChange,
  onSearch,
  placeholder,
  buttonLabel = "Search",
}: {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder: string;
  buttonLabel?: string;
}) {
  return (
    <form
      className="flex gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
    >
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button type="submit">
        <Search className="mr-2 h-4 w-4" />
        {buttonLabel}
      </Button>
    </form>
  );
}
