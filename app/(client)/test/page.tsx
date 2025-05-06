function Item({ content, classname }: { content: string; classname?: string }) {
  return (
    <div
      className={`border-border bg-accent border p-4 text-center ${classname}`}
    >
      {content}
    </div>
  );
}

export default function Page() {
  return (
    <div className="mt-8 grid grid-cols-4">
      <Item content="1" classname="col-span-2" />
      <Item content="2" />
      <Item content="3" />
      <Item content="4" />
      <Item content="5" />
      <Item content="6" />
    </div>
  );
}
