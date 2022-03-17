import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Post, User } from "../types";
import Posts from "./Posts";
import TogglePostsList from "./TogglePostsList";
import PostForm from "./PostForm";

type HomeProps = {
  user: User;
  posts: Post[] | null;
  setPosts: React.Dispatch<React.SetStateAction<any>>;
};
const Home = (props: HomeProps) => {
  const { user, posts, setPosts } = props;
  const initialPosts = 10;
  //declare states

  const [postToShow, setPostToShow] = useState<Post[] | null>(null);
  const [visibleposts, setVisiblePosts] = useState<Post[] | null>(null);
  const [showedPostsCount, setShowedPostsCount] =
    useState<number>(initialPosts);

  useEffect(() => {
    if (posts) {
      //filter visible post
      setVisiblePosts(posts.filter((post) => post.visible === true));
    }
  }, [posts]);

  useEffect(() => {
    if (visibleposts) {
      //sort, and slice posts to be displayed
      setPostToShow(
        visibleposts
          .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
          .slice(0, showedPostsCount)
      );
    }
  }, [visibleposts, showedPostsCount]);

  //hide post
  const toggleVisibility = (id: string) => {
    if (posts) {
      setPosts(
        posts.map((post) => {
          if (post.id === id) {
            post.visible = false;
          }
          return post;
        })
      );
    }
  };

  //function for incrementing likes
  const incrementLikes = (id: string) => {
    if (posts) {
      setPosts(
        posts.map((post) => {
          if (post.id === id) {
            post.likes++;
          }
          return post;
        })
      );
    }
  };

  //add post
  const addPost = (content: string) => {
    //add additional data
    let newpost = {
      content: content,
      username: user.username,
      title: "Web Developer",
      id: uuidv4(),
      likes: 0,
      visible: true,
      createdAt: Date.now().toString(),
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/815.jpg",
    };
    //TODO, fix posts &&
    posts && setPosts([...posts, newpost]);
  };

  return (
    <Grid container>
      <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
        {postToShow !== null &&
          postToShow.map((post: Post) => {
            return (
              <Posts
                key={post.id}
                post={post}
                toggleVisibility={toggleVisibility}
                incrementLikes={incrementLikes}
              />
            );
          })}
        {postToShow && visibleposts && (
          <TogglePostsList
            postToShow={postToShow}
            posts={visibleposts}
            showedPostsCount={showedPostsCount}
            setShowedPostsCount={setShowedPostsCount}
            initialPosts={initialPosts}
          />
        )}
      </Grid>
      <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
        <PostForm addPost={addPost} />
      </Grid>
    </Grid>
  );
};

export default Home;
