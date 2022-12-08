import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import './VideoPage.css'

import axios from "axios";

const VideoPage = (props) => {
    const [user, token] = useAuth();
    const [userInput, setUserInput] = useState('');
    const [comments, setComments] = useState([]);
    const [relatedVideos, setRelatedVideos] = useState([]);
    const navigate = useNavigate()

    const {video_id} = useParams()
    
    async function getFilteredComments(video_id){
        const response = await axios.get(`http://127.0.0.1:8000/api/comment/${video_id}`);
        console.log(response.data);
        setComments(response.data);
      }

      async function getRelatedVideos(video_id){
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${video_id}&type=video&key=${props.userKey}`)
        console.log(response.data.items);
        setRelatedVideos(response.data.items);
    }

    useEffect(() => {
        getFilteredComments(video_id);
    }, [navigate]);

    useEffect(() => {
        getRelatedVideos(video_id);
    }, []);

    const handleClick = (video) => {
        navigate(`/video/${video.id.videoId}`);

    }

    async function handleSubmit (event) {
            const response = await axios.post("http://127.0.0.1:8000/api/comment/", {
                video_id: video_id,
                text: userInput,
                likes: 0,
                dislikes: 0
            },
            {headers: {
                Authorization: "Bearer " + token,
            }});     
     }

    return (
        <div className="videoPageContent">
            <div className="videoPageLeft">
                <div className="videoSelected">
                    <iframe id="ytplayer" type="text/html" width="640" height="360"
                    src={`https://www.youtube.com/embed/${video_id}`}
                    frameBorder="0"></iframe>
                </div>
                <div className="commentsDiv">
                    <div className="createComment">
                        {user ? (
                            <form onSubmit={handleSubmit}>
                                <input type={"textarea"} value={userInput} onChange={(event) => setUserInput(event.target.value)}></input>
                                <button type="submit">Submit</button>
                            </form>
                        ) : (
                            <h5>Must be logged in to comment.</h5>
                        )}
                    </div>
                    <br></br>
                    <div className="commentSection">
                        {comments.map((comment) => {
                            return (
                                <ul>
                                    <strong>{comment.user.username}: &nbsp;</strong> {comment.text}
                                </ul>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="emptyMiddle">
                <br></br>
            </div>
            <div className="videoPageRight">
                <h3>Related Videos: </h3>
                <br></br>
                {relatedVideos.map((video) => {
                        return (
                            <div className="relatedVideoResults">
                                <ul>
                                    <img src={`${video.snippet.thumbnails.medium.url}`} width='240px' height='120px' onClick={() => handleClick(video)}></img>
                                </ul>
                                <p>{`${video.snippet.title}`}</p>
                                <br></br>
                            </div>
                        );
                })}
            </div>
        </div>
    )
};


export default VideoPage;