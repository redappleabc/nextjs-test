import client from '@/lib/contenful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { notFound } from 'next/navigation';
import "./slug.css"

type Params = {
  params: {
    slug: string;
  };
};

export default async function BlogDetailPage({ params }: Params) {
  console.log('Slug received:', params.slug);

  const res = await client.getEntries({ content_type: 'blogPost' });
  const posts = res.items;

  if (!posts) return notFound();

  return (
    <div className="post-container">
        {posts.map((post: any) =>{
            console.log("postssss", post.fields.slug)
            if (decodeURIComponent(params.slug) !== post.fields.slug) return;
            return (
                <div key={post.sys.id} className='post-container-details'>
                    <h1>{post.fields.title}</h1>
                    <div>{documentToReactComponents(post.fields.content)}</div>
                </div>
            )})}
    </div>
  );
}
