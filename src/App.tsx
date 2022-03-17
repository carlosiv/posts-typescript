import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { User, Post } from "./types";
import postsDataFaker from "./postsDataFaker.json";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(postsDataFaker);
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <Box sx={{ background: "#e0e0e0" }}>
      <Navbar user={user} />
      <Routes>
        {user === null ? (
          <Route path="/login" element={<Login setUser={setUser} />} />
        ) : (
          <>
            <Route
              path="/home"
              element={<Home user={user} posts={posts} setPosts={setPosts} />}
            />
            <Route
              path="/dashboard"
              element={
                <Dashboard user={user} posts={posts} setPosts={setPosts} />
              }
            />
          </>
        )}
      </Routes>
    </Box>
  );
}

export default App;
