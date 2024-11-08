import CreateNote from "@/components/CreateNote/CreateNote";
import "@picocss/pico";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="container">
          <NavBar />
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}

function NavBar() {
  return (
    <nav>
      <ul>
        <li>Notes</li>
      </ul>
      <ul>
        <li>
          <CreateNote />
        </li>
      </ul>
    </nav>
  );
}
