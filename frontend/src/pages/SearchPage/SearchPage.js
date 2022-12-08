import React from "react";
import { useEffect, useState } from "react";
import "./SearchPage.css"

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

    const handleClick = (video) => {
        navigate(`/video/${video.id.videoId}`);
    };

    return (
        <div className="searchPage">
            <div className="searchBox">
                <form onSubmit={handleSearch}>
                    <input type={"text"} value={userInput} onChange={(event) => setUserInput(event.target.value)} />
                    <button type="submit">Search</button>
                </form>
            </div>
            <div className="videoResultsDisplay">
                {videoResults.map((video) => {
                    return (
                        <div className="searchResults">
                            <ul>
                                <img src={`${video.snippet.thumbnails.medium.url}`} onClick={() => handleClick(video)}></img>
                            </ul>
                            <p>{`${video.snippet.title}`}</p>
                            <br></br>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default SearchPage;
