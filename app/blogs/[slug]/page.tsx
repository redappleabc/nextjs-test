import client from '@/lib/contenful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { notFound } from 'next/navigation';
import "./slug.css"

type BlogDetailPageProps = {
  params: {
    slug: string;
  };
};

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {

  const res = await client.getEntries({ content_type: 'blogPost' });
  const posts = res.items;

  const post: any = posts.find(
    (post: any) => decodeURIComponent(params.slug) === post.fields.slug
  );

  if (!post) return notFound();

  return (
    <div className="post-container">
      <div key={post.sys.id} className="post-container-details">
        <h1>{post.fields.title}</h1>
        <div>{documentToReactComponents(post.fields.content)}</div>
      </div>
    </div>
  );
}
