"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPackagesRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/dashboard/packages");
  }, [router]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white text-slate-500 font-mono text-sm tracking-widest">
      REDIRECTING TO WORKSPACE...
    </div>
  );
}
