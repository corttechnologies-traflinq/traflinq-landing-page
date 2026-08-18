import { SelfAuditPage } from "@/components/self-audit-page"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Self-Audit | Traflinq Saudi",
  description: "Run a self-audit of your mobility operations to uncover leakage, utilization gaps, and governance blind spots.",
}

export default function SaudiSelfAuditRoute() {
  return <SelfAuditPage />
}
