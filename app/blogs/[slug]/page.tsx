// app/blogs/[slug]/page.tsx
import client from '@/lib/contenful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { notFound } from 'next/navigation';
import "./slug.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const res = await client.getEntries({ content_type: 'blogPost' });
  return res.items.map((post: any) => ({ slug: post.fields.slug }));
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const res = await client.getEntries({ content_type: 'blogPost' });
  const post = res.items.find((post: any) => decodeURIComponent(slug) === post.fields.slug);

  if (!post) return notFound();

  return (
    <div className="post-container">
      <div key={post.sys.id} className="post-container-details">
        <h1>{post.fields.title as any}</h1>
        <div>{documentToReactComponents(post.fields.content as any)}</div>
      </div>
    </div>
  );
}
