import { petitionRoutes } from "data/Routes";
import * as React from "react";

export interface IVideoPlayerProps {
  id: string;
  [key: string]: any;
}

export function VideoPlayer({ id, ...props }: IVideoPlayerProps) {
  return (
    <video
      controls={false}
      autoPlay={true}
      id="video-player"
      {...props}
      src={`${petitionRoutes.video}?videoId=${id}`}
    />
  );
}
