import NavBar from "@/src/components/layout/NavBar";
import NavContainer from "@/src/components/layout/NavContainer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <NavBar /> */}
      <NavContainer/>
      <main className="flex-1">{children}</main>
    </>
  );
}