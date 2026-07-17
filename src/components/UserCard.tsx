import React from "react";
import type { User } from "../types";

export interface UserCardProps {
  user: User;
  onSelect?: (user: User) => void;
}

export default function UserCard({ user, onSelect }: UserCardProps) {
  return (
    <div className="user-card" style={{ border: "1px solid #ddd", padding: 8, borderRadius: 6 }}>
      <h3>{user.name}</h3>
      <div>{user.role}</div>
      <div style={{ fontSize: 12, color: "#666" }}>{user.email}</div>
      <button onClick={() => onSelect && onSelect(user)} style={{ marginTop: 8 }}>
        Select
      </button>
    </div>
  );
}
