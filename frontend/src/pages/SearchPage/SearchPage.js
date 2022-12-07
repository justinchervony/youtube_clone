import React from "react";
import { useEffect, useState } from "react";

import axios from "axios";

const SearchPage = () => {
    const [userInput, setUserInput] = useState('');
    const [videoResults, setVideoResults] = useState([])

    async function handleSearch(event){
        event.preventDefault();
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${userInput}&key=AIzaSyBFWg6hzRljtXAs1hTaKDRfMUlD5F8JOmg`)
        console.log(response.data.items);
        setVideoResults(response.data.items);
    }
    https://youtube.googleapis.com/youtube/v3/search?q=${userInput}part=snippet.thumbnails&key=[YOUR_API_KEY]

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
                            <img src={`${video.snippet.thumbnails.default}`}></img>
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