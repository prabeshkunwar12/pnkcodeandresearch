import { ProfileNav } from "./profile-nav";

export function ProfileShell({
  children,
  wide = false,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0">
        <div className="absolute -top-36 -left-28 h-95 w-95 rounded-full bg-(--cloud-1) blur-[120px] opacity-60 animate-float-slow" />
        <div className="absolute top-20 -right-30 h-90 w-90 rounded-full bg-(--cloud-2) blur-[120px] opacity-60 animate-float-slow" />
        <div className="absolute -bottom-45 left-[18%] h-110 w-110 rounded-full bg-(--cloud-3) blur-[140px] opacity-55 animate-float-slow" />
      </div>

      <div
        className={`relative mx-auto flex min-h-screen w-full flex-col px-6 pb-20 pt-10 sm:px-10 lg:px-16 ${
          wide ? "max-w-400" : "max-w-360"
        }`}
      >
        <ProfileNav />
        {children}
      </div>
    </div>
  );
}
