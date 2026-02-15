import { ProfileShell } from "@/components/profile/profile-shell";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProfileShell>{children}</ProfileShell>;
}
