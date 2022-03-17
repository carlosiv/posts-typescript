import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Post } from "../types";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";

type PostsProps = {
  post: Post;
  incrementLikes: (id: string) => void;
  toggleVisibility: (id: string) => void;
};

const Posts = (props: PostsProps) => {
  const { post, incrementLikes, toggleVisibility } = props;
  let opct;
  post.visible ? (opct = "100%") : (opct = "50%");
  const style = {
    margin: "8px",
    opacity: opct,
  };
  return (
    <Card sx={style}>
      <Stack direction="row">
        <Avatar
          alt={post.username}
          src={post.avatar}
          sx={{ width: 56, height: 56, margin: "10px" }}
        />
        <Stack sx={{ marginTop: "16px" }}>
          <Typography component="span" fontWeight="bold">
            {post.username}
          </Typography>
          <Typography
            component="span"
            color="secondary"
            fontWeight="bold"
            fontSize="14px"
          >
            {post.title}
          </Typography>
        </Stack>
      </Stack>
      <CardContent>
        <Typography component="h2" fontStyle="italic">
          "{post.content}"
        </Typography>
      </CardContent>
      <CardActions>
        <Stack>
          <Box ml="12px">{post.likes}</Box>
          <Box>
            <IconButton
              color="primary"
              aria-label="add likes"
              onClick={() => incrementLikes(post.id)}
              disabled={post.visible ? false : true}
            >
              <ThumbUpIcon />
            </IconButton>
            <IconButton
              color="secondary"
              aria-label="toggle-visibility"
              onClick={() => toggleVisibility(post.id)}
            >
              {post.visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </Box>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default Posts;
