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
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const res = await fetch("https://cloud.codesupply.co/endpoint/react/data.json");

        if (!res.ok) {
          throw new Error("Failed to load posts");
        }

        const data = await res.json();
        setPosts(data);

      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
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
            <p className="loading">Loading...</p>

          ) : filteredPosts.length > 0 ? (

            <div className="posts-grid">
              {filteredPosts.map(post => (
                <PostCard key={post.title} post={post} onClick={() => setActivePost(post)} />
              ))}
            </div>
          ) : (
            <p className="not-found">
              No posts found
            </p>
          )}
        </div>
      </div>
      <PostModal post={activePost} onClose={() => setActivePost(null)} />
    </>
  );
}