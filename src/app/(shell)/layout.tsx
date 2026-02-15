import { ProfileShell } from "@/components/profile/profile-shell";

export default function ProfilesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProfileShell>{children}</ProfileShell>;
}
