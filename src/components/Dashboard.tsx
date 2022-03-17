import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Post, User } from "../types";
import PostForm from "./PostForm";
import Posts from "./Posts";
import TogglePostsList from "./TogglePostsList";

type DashboardProps = {
  user: User;
  posts: Post[] | null;
  setPosts: React.Dispatch<React.SetStateAction<any>>;
};
const Dashboard = (props: DashboardProps) => {
  const { user, posts, setPosts } = props;
  const initialPosts = 10;
  //declare states

  const [postToShow, setPostToShow] = useState<Post[] | null>(null);
  const [ownPosts, setOwnPosts] = useState<Post[] | null>(null);

  const [showedPostsCount, setShowedPostsCount] =
    useState<number>(initialPosts);

  useEffect(() => {
    if (posts) {
      //filter own post
      setOwnPosts(posts.filter((post) => post.username === user.username));
    }
  }, [posts]);

  useEffect(() => {
    if (ownPosts) {
      //sort, and slice posts to be displayed
      setPostToShow(
        ownPosts
          .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
          .slice(0, showedPostsCount)
      );
    }
  }, [ownPosts, showedPostsCount]);

  //hide post
  const toggleVisibility = (id: string) => {
    if (posts) {
      setPosts(
        posts.map((post) => {
          if (post.id === id) {
            post.visible = !post.visible;
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
        {postToShow && (
          <TogglePostsList
            postToShow={postToShow}
            posts={ownPosts}
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

export default Dashboard;
