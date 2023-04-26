import React, { useEffect, useState } from "react";

import ReactPlayer from "react-player";

import useHttpClientCustomHook from "../../shared/hooks/useHttpClientCustomHook";
import LoadingSpinnerCentreParent from "../../shared/components/UIElements/LoadingSpinnerCentreParent";

import "./ExerciseVideo.css";

const ExerciseVideos = (props) => {
  const { exerciseName } = props;

  const { error, isLoading, sendRequest, clearError } =
    useHttpClientCustomHook();

  const [videoIds, setVideoIds] = useState([]);

  useEffect(() => {
    const getExerciseVideoIds = async () => {
      try {
        const responseData = await sendRequest(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${exerciseName}%20tutorial&key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
          "GET",
          null
        );

        const videoIdArray = responseData.items.map((item) => {
          return item.id.videoId;
        });
        setVideoIds(videoIdArray);
      } catch (e) {}
    };
    getExerciseVideoIds();
    //we want to send a request to end point to get workout tracking progress for the provided workout id.
  }, [sendRequest]);

  // there will be 5 player
  return (
    <>
      {isLoading && <div className="player-wrapper"></div>}
      {videoIds.length === 5 && (
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            controls={true}
            width="100%"
            height="100%"
            url={[
              `https://www.youtube.com/watch?v=${videoIds[0]}`,
              `https://www.youtube.com/watch?v=${videoIds[1]}`,
              `https://www.youtube.com/watch?v=${videoIds[2]}`,
              `https://www.youtube.com/watch?v=${videoIds[3]}`,
              `https://www.youtube.com/watch?v=${videoIds[4]}`,
            ]}
          />
        </div>
      )}
    </>
  );
};

export default ExerciseVideos;
