import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useParams } from "react-router-dom";

import axios from "axios";

const VideoPage = (props) => {
    const [user, token] = useAuth();
    const [comments, setComments] = useState([]);
    const [searchSelection, setSearchSelection] = useState(props.searchResults);

    const {video_id} = useParams()
    
    async function getFilteredComments(video_id){
        const response = await axios.get(`http://127.0.0.1:8000/api/comment/${video_id}`);
        console.log(response.data);
        setComments(response.data);
      }


    //   'KSMVflSBKx8'
    //   'FTQbiNvZqaY'
    // useEffect(() => {
    //     setSearchSelection(props.searchResults)
    // }, []);

    useEffect(() => {
        getFilteredComments(video_id);
    }, []);


    return (
        <div className="videoPageContent">
            <div className="videoSelected">
                <iframe id="ytplayer" type="text/html" width="640" height="360"
                src={`https://www.youtube.com/embed/${video_id}`}
                frameBorder="0"></iframe>
            </div>
            <div className="commentSection">
                {comments.map((comment) => {
                    return (
                        <ul>
                            {comment.user.username}: {comment.text}
                        </ul>

                    );
                })}
            </div>
        </div>
    )

}

export default VideoPage;