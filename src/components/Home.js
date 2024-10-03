import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PostCommentInput from "./PostCommentInput";

function Home() {
  const [listOfPost, setListOfPost] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:3002/post").then((res) => {
      console.log("res===>", res);
      setListOfPost(res.data.post);
    });
  }, []);
  return (
    <div>
      {listOfPost?.map((val, key) => {
        return (
          <div>
            <div className="container my-5">
              <div className="card mb-3">
                <div className="card-header bg-light text-dark">
                  <h5 className="mb-0">{val.title}</h5>
                </div>

                <div className="card-body">
                  <p className="card-text">{val.postText}</p>
                </div>

                <div className="card-footer text-muted d-flex justify-content-between">
                  <span>
                    <i className="bi bi-hand-thumbs-up me-1"></i>Like
                  </span>
                  <span>
                    <i className="bi bi-hand-thumbs-up me-1"></i>Comments
                  </span>
                  <span>{val.username}</span>
                </div>
                <div className="width75 ">
                  <PostCommentInput postId={val.id} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
