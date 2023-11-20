import { useState, useEffect, useRef } from "react";
import { auth } from "../config/firebase-config";
import { firestore } from "../config/firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import "../styles/home.scss";
import { useTranslation } from "react-i18next";

interface Post {
  id: string;
  title?: string;
  post?: string;
  user?: string;
  comments?: { text: string; timestamp: number }[];
  displayName?: string;
}

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const commentInputRef = useRef<HTMLInputElement>(null);

  const { t } = useTranslation();

  useEffect(() => {
    document.title = "Home";
    const postsCollection = collection(firestore, "posts");
    onSnapshot(postsCollection, (snapshot) => {
      const posts = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setPosts(posts);
    });
  }, []);

  const deletePost = (id: string) => {
    const postsCollection = doc(firestore, "posts", id);
    deleteDoc(postsCollection)
      .then(() => {
        console.log("Post deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addComment = async (postId: string) => {
    if (newComment === "") return;

    const timestamp = Date.now();
    const postRef = doc(firestore, "posts", postId);

    const formattedComment =
      newComment.length > 50
        ? `${user?.displayName}:\n${newComment}`
        : `${user?.displayName}: ${newComment}`;

    await updateDoc(postRef, {
      comments: arrayUnion({
        text: formattedComment,
        timestamp,
      }),
    });

    setNewComment("");
    if (commentInputRef.current) {
      commentInputRef.current.defaultValue = "";
    } else {
      console.error("commentInputRef is null");
    }
  };

  const deleteComment = async (
    postId: string,
    commentId: string,
    commentIndex: number
  ) => {
    const postRef = doc(firestore, "posts", postId);
    const postSnapshot = await getDoc(postRef);
    const postData = postSnapshot.data();

    if (postData && postData.comments && postData.comments[commentIndex]) {
      const comment = postData.comments[commentIndex];

      if (comment.text.startsWith(`${user?.displayName}:`)) {
        await updateDoc(postRef, {
          comments: postData.comments.filter(
            (_, index) => index !== commentIndex
          ),
        });
      } else {
        console.log("You are not the author of this comment.");
      }
    }
  };

  return (
    <>
      <h1 className="title">{t("BlogApp")}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : user ? (
        <>
          <p className="title">
            {t("Welcome")} {user.displayName}
          </p>
        </>
      ) : (
        <></>
      )}
      <ul>
        {posts.map(
          ({ id, title, post, user: postUser, comments, displayName }) => (
            <div key={id} className="homeWrapper">
              <h1 className="title">{title}</h1>
              <p className="text">{post}</p>
              <p className="text">{postUser}</p>

              {user && (
                <form
                  className="commentForm"
                  onSubmit={(e) => {
                    e.preventDefault();
                    addComment(id);
                    setNewComment("");
                  }}
                >
                  <input
                    type="text"
                    placeholder={t("AddComment")}
                    ref={commentInputRef}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="commentInput"
                  />
                  <button type="submit" className="commentButton">
                    {t("AddComment")}
                  </button>
                </form>
              )}

              <ul className="comments">
                {comments &&
                  comments.map(({ text, timestamp }, index) => (
                    <li key={index} className="comment">
                      {text.length > 50 ? (
                        <span>
                          {text.substring(0, 50)}
                          <br />
                          {text.substring(50)}
                        </span>
                      ) : (
                        text
                      )}
                      - {new Date(timestamp).toLocaleString()}{" "}
                      {user && text.startsWith(`${user.displayName}:`) && (
                        <button
                          className="deleteComment"
                          onClick={() => deleteComment(id, id, index)}
                        >
                          {t("DeleteComment")}
                        </button>
                      )}
                    </li>
                  ))}
              </ul>

              <div></div>
              {displayName === user ? (
                <button className="delete" onClick={() => deletePost(id)}>
                  Delete Post
                </button>
              ) : (
                <></>
              )}
            </div>
          )
        )}
      </ul>
    </>
  );
};

export default Home;
