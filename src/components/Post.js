import React, { useEffect, useState } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
function Post() {
  const { id } = useParams();
  const [post, setPost] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3002/post/byId/${id}`).then((res) => {
      setPost(res.data.post[0]);
    });
  }, []);
  return (
    <div>
      <div>{post.title}</div>
    </div>
  );
}

export default Post;
