import Link from "next/link";
import { draftMode } from "next/headers";
import Date from "./date";
import CoverImage from "./cover-image";
import Avatar from "./avatar";
import MoreStories from "./more-stories";
import { Markdown } from "@/lib/markdown";
import { getAllPosts, getCreators } from "@/lib/api";

function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Black Wealth Crypto
      </h1>
      <h2 className="text-center md:text-left text-lg mt-5 md:pl-8">
        Empowering wealth creation through cryptocurrency education. Powered by{" "}
        <a
          href="https://nextjs.org/"
          className="underline hover:text-success duration-200 transition-colors"
        >
          Next.js
        </a>{" "}
        and{" "}
        <a
          href="https://www.contentful.com/"
          className="underline hover:text-success duration-200 transition-colors"
        >
          Contentful
        </a>
        .
      </h2>
    </section>
  );
}

function HeroPost({
  title,
  featuredImage,
  publishedDate,
  subtitle,
  author,
  slug,
}: {
  title: string;
  featuredImage: any;
  publishedDate: string;
  subtitle: string;
  author: any;
  slug: string;
}) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} slug={slug} url={featuredImage.url} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <Date dateString={publishedDate} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{subtitle}</p>
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
      </div>
    </section>
  );
}

export default async function Page() {
  const { isEnabled } = await draftMode();
  const allPosts = await getAllPosts(isEnabled);
  const creators = await getCreators();
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <div className="container mx-auto px-5">
      <Intro />
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          featuredImage={heroPost.featuredImage}
          publishedDate={heroPost.publishedDate}
          subtitle={heroPost.subtitle}
          author={heroPost.author}
          slug={heroPost.slug}
        />
      )}
      <MoreStories morePosts={morePosts} />
      <h2 className="text-2xl font-bold mb-4 mt-8">Black Crypto Content Creators</h2>
      {creators.length > 0 ? (
        creators.map((creator) => (
          <div key={creator.name} className="mb-6">
            <h3 className="text-xl font-semibold">{creator.name}</h3>
            <div className="prose">
              <Markdown content={creator.bio} />
            </div>
            {creator.socialLinks?.x && (
              <a href={creator.socialLinks.x} className="text-blue-600">X Profile</a>
            )}
          </div>
        ))
      ) : (
        <p>No creators available.</p>
      )}
    </div>
  );
}
