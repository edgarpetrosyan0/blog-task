import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import PostCard from "../components/PostCard/PostCard";
import PostModal from "../components/PostModal/PostModal";
import "./Home.css";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [activePost, setActivePost] = useState(null);


  useEffect(() => {
    setLoading(true);

    fetch("https://cloud.codesupply.co/endpoint/react/data.json")
      .then(res => {
        if (!res.ok) throw new Error("Failed to load posts");
        return res.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
      
  }, []);

  const filteredPosts = posts.filter(post =>
    (post.title || "").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <Header query={query} setQuery={setQuery} />
      
      <div className="main">
      <div className="card-wrapper">
           {loading ? (
          <p style={{ textAlign: "center", padding: "4rem 0" }}>Loading posts...</p>
        ) : filteredPosts.length > 0 ? (
          <div className="posts-grid">
            {filteredPosts.map(post => (
              <PostCard key={post.title} post={post} onClick={() => setActivePost(post)} />
            ))}
          </div>
        ) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center", padding: "4rem 1rem" }}>
            No posts found for "{query}"
          </p>
        )}
      </div>
      </div>
      <PostModal post={activePost} onClose={() => setActivePost(null)} />
    </>
  );
}