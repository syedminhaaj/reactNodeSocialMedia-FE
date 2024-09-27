import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
  const [listOfPost, setListOfPost] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3002/post").then((res) => {
      console.log("res****", res);
      setListOfPost(res.data.post);
    });
  }, []);
  return (
    <div>
      {listOfPost.map((val, key) => {
        return (
          <div>
            <div class="container my-5">
              <div class="card mb-3">
                <div class="card-header bg-light text-dark">
                  <h5 class="mb-0">{val.title}</h5>
                </div>

                <div class="card-body">
                  <p class="card-text">{val.postText}</p>
                </div>

                <div class="card-footer text-muted d-flex justify-content-between">
                  <span>
                    <i class="bi bi-hand-thumbs-up me-1"></i>Like
                  </span>
                  <span>
                    <i class="bi bi-chat-left-text me-1"></i>Comment
                  </span>
                  <span>{val.username}</span>
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
