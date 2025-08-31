

import "./blogs.css";
import clientData from '@/lib/contenful';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import Link from 'next/link';

export default async function Page() {
  const res = await clientData.getEntries({ content_type: 'blogPost' });
  const posts = res.items;

  return (
    <div className="page-blogs">
      <div className="header-image">
      </div>
      <div className="container mx-auto px-5 learn-blog-container">
        <div className="crypto">
          <div className="crypto-text">
            <h1>
              GET FAMILIAR WITH THE
            </h1>
            <h1>
              WORLD OF CRYPTO
            </h1>
            <span>
              Whether you’re learning the basics or diving deep into the world of DeFi, NFTs, and trading, our articles break it all down in simple terms. Explore, learn, and grow your crypto wealth!
            </span>
          </div>
          <div className="crypto-image">
            <img src="/assets/wireframe-img-1-e1708013680578.png" alt="" />
          </div>
        </div>
      </div>
      <div className="blogs">
        <div className="blog-grid">
          {posts.map((post: any) => (
            <div key={post.sys.id}>
              <Link href={`/blogs/${post.fields.slug}`} target="_blank">
                <div className="card">
                  <h3>{post.fields.title}</h3>
                  <span>{documentToPlainTextString(post.fields.content).substring(0, 150)}...</span>
                  <p style={{ color: '#5f2eea' }}>READ MORE »</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      <div className="black-bar">
        <div className="black-bar-left">
          <span>READY TO EMBARK</span> 
          <span>ON THE CRYPTO</span> 
          <span>WAGON TO</span> 
          <span>DESTINATION</span>
          <span>WEALTH?</span> 
        </div>
        <div className="black-bar-right">
          <span>Get in touch today and receive a</span>
          <span>complimentary consultation.</span>
          <div className="button">
            <a
              href="#"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-white text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors lg:mb-0"
            >
              Request a consultation 
            </a>
          </div>
        </div>
      </div>
      <div className="social-media">
        <div className="social-media-text">
          <span>Social Media Posts</span>
          <p>This is a gallery to showcase images from your recent social posts</p>
        </div>
        <div className="social-media-image">
          
        </div>
      </div>

      <div className="newsletter">
        <div className="newsletter-text">
          Join Our Newsletter
        </div>
        <form className="newsletter-form" method="post" name="Newsletter Form">
          <input type="text" name="name" id="name" placeholder="Full Name" />
          <input type="email" name="email" id="email" placeholder="Email" />
          <button className="elementor-button elementor-size-md" type="submit">
            <span className="elementor-button-content-wrapper">
              <span className="elementor-button-text">Submit</span>
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}