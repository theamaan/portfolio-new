"use client";

import { createContext, useContext, useState } from "react";

export type Role = "ai" | "backend" | "data";

type SiteCtx = {
  role: Role;
  setRole: (r: Role) => void;
  recruiterMode: boolean;
  toggleRecruiterMode: () => void;
};

const SiteContext = createContext<SiteCtx>({
  role: "ai",
  setRole: () => {},
  recruiterMode: false,
  toggleRecruiterMode: () => {},
});

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>("ai");
  const [recruiterMode, setRecruiterMode] = useState(false);
  return (
    <SiteContext.Provider
      value={{ role, setRole, recruiterMode, toggleRecruiterMode: () => setRecruiterMode((v) => !v) }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export const useSite = (): SiteCtx => useContext(SiteContext);
