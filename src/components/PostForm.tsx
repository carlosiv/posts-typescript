import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

type PostFormProps = {
  addPost: (content: string) => void;
};

const PostForm = (props: PostFormProps) => {
  const { addPost } = props;
  const [newpost, setNewPost] = useState<string>("");
  const [formError, setFormError] = useState<string[] | null>(null);

  const handleSubmit = () => {
    if (newpost === null || newpost === "") {
      setFormError(["newpost"]);
    } else {
      addPost(newpost);
      setNewPost("");
    }
  };
  return (
    <Card sx={{ margin: "8px" }}>
      <CardContent>
        <Typography component="h2">Add New Post</Typography>
        <Stack spacing={2}>
          <TextField
            error={formError?.includes("newpost")}
            id="filled-post"
            label="Post"
            variant="filled"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewPost(e.target.value)
            }
            value={newpost}
            required
            helperText={
              formError?.includes("newpost")
                ? "Please provide a Post content"
                : ""
            }
          />
        </Stack>
      </CardContent>
      <CardActions>
        <Button onClick={handleSubmit}>Add Post</Button>
      </CardActions>
    </Card>
  );
};

export default PostForm;
