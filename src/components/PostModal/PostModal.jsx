 import "./post-modal.css";

export default function PostModal({ post, onClose }) {
  if (!post) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>

        {post.img && (
          <div className="modal-image-wrapper">
            <img
              src={post.img}
              srcSet={`${post.img} 1x, ${post.image_2x || post.img} 2x`}
              alt={post.title}
              loading="lazy"
            />
          </div>
        )}

        <div className="modal-body">
          <div className="modal-meta-top">
            <span className="tags-modal">{post.tags}</span>
          </div>

          <h2 className="modal-title">{post.title}</h2>

          <div className="modal-meta-bottom">
            <span className="author">{post.autor || post.author || "Автор"}</span>
            <span className="separator">·</span>
            <span className="date">{post.date}</span>
            <span className="separator">·</span>
            <span className="views">{post.views}</span>
          </div>

          <div className="modal-description">
            {post.text}
          </div>
        </div>
      </div>
    </div>
  );
}