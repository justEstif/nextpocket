async function getNote(noteId: string) {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
  );
  const data = await res.json();
  return data;
}

export default async function NotePage({ params }: any) {
  const { id, title, content, created } = await getNote(params.id);
  return (
    <section>
      <h1>Note</h1>
      <article>
        <p>{id}</p>
        <p>{title}</p>
        <p>{content}</p>
        <p>{created}</p>
      </article>
    </section>
  );
}
