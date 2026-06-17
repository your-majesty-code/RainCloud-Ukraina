import { notFound } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/navigation';

const SECTIONS = new Map(
  NAV_ITEMS.filter((i) => i.href !== '/feed').map((i) => [i.href.slice(1), i]),
);

export default async function SectionPlaceholder({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const item = SECTIONS.get(section);
  if (!item) notFound();

  return (
    <section className="storm-hero" style={{ padding: '64px 48px', gap: 12 }}>
      <h1 className="storm-hero__title" style={{ marginBottom: 8 }}>
        {item.label}
      </h1>
      <p className="storm-hero__sub" style={{ marginBottom: 0, maxWidth: 560 }}>
        {item.tip}
      </p>
      <p className="text-muted" style={{ fontSize: 14, marginTop: 16 }}>
        This section is coming next. The Feed dashboard is live — explore it from the sidebar.
      </p>
    </section>
  );
}
