import "./post-card.css";

export default function PostCard({ post, onClick }) {
  return (
    <article className="post-card" onClick={() => onClick()}>
      <div className="post-image-wrapper">
        <img
          src={post.img}
          srcSet={`${post.img} 1x, ${post.image_2x || post.img} 2x`}
          alt={post.title}
          loading="lazy"
        />
      </div>

      <div className="post-content">
        <div className="post-meta-top">
         <span className="tags">{post.tags}</span>
        </div>

        <h3 className="title">{post.title}</h3>

        <div className="post-meta-bottom">
          <span className="author">{post.autor || post.author}</span>
          <span className="separator">·</span>
          <span className="date">{post.date}</span>
          <span className="separator">·</span>
          <span className="views">{post.views}</span>
        </div>

        <p className="description">{post.text}</p>
      </div>
    </article>
  );
}