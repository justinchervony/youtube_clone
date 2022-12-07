import React from "react";
import { useEffect, useState } from "react";

import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

const SearchPage = (props) => {
    const [userInput, setUserInput] = useState('');
    const [videoResults, setVideoResults] = useState([])
    const navigate = useNavigate()

    async function handleSearch(event){
        event.preventDefault();
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${userInput}&key=${props.userKey}`)
        console.log(response.data.items);
        setVideoResults(response.data.items);
    }
    // https://youtube.googleapis.com/youtube/v3/search?q=${userInput}part=snippet.thumbnails&key=[YOUR_API_KEY]

    const handleClick = (video) => {
        navigate(`/video/${video.id.videoId}`);
    };


    

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input type={"text"} value={userInput} onChange={(event) => setUserInput(event.target.value)} />
                <button type="submit">Search</button>
            </form>
            <div className="videoResultsDisplay">
                {videoResults.map((video) => {
                    return (
                        <ul>
                            <img src={`${video.snippet.thumbnails.default.url}`} onClick={() => handleClick(video)}></img>
                            {/* <Link to={`/video/${video.id.videoId}`}>{video.id}</Link> */}
                        </ul>
                    );
                })}
            </div>
        </div>
    )
}

export default SearchPage;

                            {/* <iframe id="ytplayer" type="text/html" width="320" height="180"
                            src={`https://www.youtube.com/embed/${video.id.videoId}`}
                            frameBorder="0"></iframe> */}