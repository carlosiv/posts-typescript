import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { Post } from "../types";

type TogglePostsListProps = {
  postToShow: Post[];
  posts: Post[] | null;
  showedPostsCount: number;
  initialPosts: number;
  setShowedPostsCount: (count: number) => void;
};

const TogglePostsList = (props: TogglePostsListProps) => {
  const {
    postToShow,
    posts,
    showedPostsCount,
    setShowedPostsCount,
    initialPosts,
  } = props;
  return (
    <Box
      sx={{
        display: "flex",
        marginX: "auto",
        justifyContent: "center",
        marginY: "10px",
      }}
    >
      {postToShow === null || postToShow.length <= 0 ? (
        <Typography>No Post to Show</Typography>
      ) : (
        <ButtonGroup variant="contained">
          {posts !== null && posts.length > postToShow.length && (
            <Button onClick={() => setShowedPostsCount(showedPostsCount + 10)}>
              Show More
            </Button>
          )}
          {postToShow !== null && postToShow.length > initialPosts && (
            <Button onClick={() => setShowedPostsCount(showedPostsCount - 10)}>
              Show Less
            </Button>
          )}
        </ButtonGroup>
      )}
    </Box>
  );
};

export default TogglePostsList;
