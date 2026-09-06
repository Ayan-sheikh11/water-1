export function SimplePage({
  title,
  eyebrow,
}: {
  title: string;
  eyebrow: string;
}) {
  return (
    <main className="page">
      <div className="container narrow simple">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>
          PureFlow is built around clear choices, fresh water, transparent
          delivery and a smooth customer experience for Karachi.
        </p>
      </div>
    </main>
  );
}
