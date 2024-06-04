"use client";

import React from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { formatTime } from "@/lib/formatTime";
import { useAudio } from "@/app/providers/AudioProvider";
import { PodcastProps } from "@/types";

const LatestPodcasts = () => {
  const latestPodcasts = useQuery(api.podcasts.getNewestPodcasts);
  const updateViews = useMutation(api.podcasts.updatePodcastViews);

  const { setAudio } = useAudio();

  const handlePlay = async ({ podcast }: { podcast: PodcastProps }) => {
    await updateViews({ podcastId: podcast._id! });

    setAudio({
      title: podcast.podcastTitle,
      audioUrl: podcast.audioUrl!,
      imageUrl: podcast.imageUrl!,
      author: podcast.author,
      podcastId: podcast._id!,
    });
  };

  return (
    <div className="flex flex-col gap-3 w-full h-96">
      <h1 className="text-20 font-bold text-white-1">Latest Podcasts</h1>
      {latestPodcasts?.map((podcast, index) => (
        <div
          key={podcast._id}
          className="flex h-20 items-center justify-between gap-6 border-b border-slate-800 pb-4 mt-2"
        >
          <div className="flex items-center text-center gap-4">
            <div className="relative group w-[70px]">
              <span className="group-hover:hidden text-12 lg:text-16 font-normal text-white-1 mx-5">
                {index + 1}
              </span>
              <span className="hidden group-hover:block mx-5 cursor-pointer">
                <Image
                  src="/icons/Play.svg"
                  layout="fixed"
                  objectFit="cover"
                  objectPosition="center"
                  width={50}
                  height={50}
                  alt="play"
                  onClick={handlePlay.bind(podcast, { podcast } as any)}
                />
              </span>
            </div>
            <Image
              src={podcast.imageUrl!}
              width={50}
              height={50}
              alt="thumbnail"
              className="rounded-lg"
            />

            <p className="font-bold text-white-1 text-sm lg:text-md text-md max-w-[35vw] truncate capitalize">
              {podcast?.podcastTitle}
            </p>
          </div>
          <div className="flex items-center border-white-1 gap-2">
            <Image
              src="/icons/headphone.svg"
              width={24}
              height={24}
              alt="ear"
            />
            <p className="text-14 font-medium text-white-1 w-[6vw]">
              {podcast?.views}
            </p>
            <Image
              src="/icons/watch.svg"
              width={24}
              height={24}
              alt="duration"
            />
            <p className="text-14 font-medium text-white-1 w-[6vw]">
              {formatTime(podcast?.audioDuration)}
            </p>
            <Image
              src="/icons/three-dots.svg"
              width={28}
              height={28}
              alt="nav"
              className="rotate-90 cursor-pointer mx-5"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LatestPodcasts;
