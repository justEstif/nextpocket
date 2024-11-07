import Link from "next/link";
import "@picocss/pico";

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
        <li>
          <Link href="/">Home</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link href="/notes">Notes</Link>
        </li>
      </ul>
    </nav>
  );
}
