import Link from "next/link";

async function getNotes() {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30",
  );
  const data = await res.json();
  return data?.items as any[];
}

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <div>
      <hgroup className="grid">
        <h1>Notes</h1>
      </hgroup>
      {notes?.map((note) => {
        return <Note key={note.id} note={note} />;
      })}
    </div>
  );
}

function Note({ note }: any) {
  const { id, title, content, created } = note || {};

  return (
    <article>
      <Link href={`/notes/${id}`}>
        <h2>{title}</h2>
        <h2>{content}</h2>
        <p>{created}</p>
      </Link>
    </article>
  );
}
