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
    <div className="flex flex-col w-full h-96">
      <h1 className="text-20 font-bold text-white-1 mb-3">Latest Podcasts</h1>
      {latestPodcasts?.map((podcast, index) => (
        <div
          key={podcast._id}
          className="group hover:bg-orange-1/75 hover:rounded-md flex h-20 items-center justify-between border-b border-slate-800 py-4"
        >
          <div className="flex items-center text-center gap-4">
            <div className="grid grid-cols-12 gap-2">
              <div className="flex items-center justify-center">
                <span className="group-hover:hidden text-12 lg:text-16 font-normal text-white-1 mx-5">
                  {index + 1}
                </span>
                <Image
                  src="/icons/Play.svg"
                  width={26}
                  height={26}
                  alt="play"
                  onClick={handlePlay.bind(podcast, { podcast } as any)}
                  className="hidden group-hover:flex"
                />
              </div>
              <div className="flex items-center">
                <Image
                  src={podcast.imageUrl!}
                  layout="fixed"
                  objectFit="cover"
                  objectPosition="center"
                  width={60}
                  height={60}
                  alt="thumbnail"
                  className="rounded-lg"
                />
              </div>
              <div className=" max-sm:col-span-7 max-md:col-span-7 col-span-6 flex items-center">
                <p className="font-semibold text-white-1 text-sm lg:text-md text-md truncate capitalize">
                  {podcast?.podcastTitle}
                </p>
              </div>
              <div className="max-md:hidden col-span-1 flex items-center justify-center gap-1">
                <Image
                  src="/icons/headphone.svg"
                  width={24}
                  height={24}
                  alt="ear"
                />
                <p className="text-14 font-medium text-white-1">
                  {podcast?.views}
                </p>
              </div>
              <div className="col-span-2 flex items-center justify-center gap-1">
                <Image
                  src="/icons/watch.svg"
                  width={24}
                  height={24}
                  alt="duration"
                />
                <p className="text-14 font-medium text-white-1">
                  {formatTime(podcast?.audioDuration)}
                </p>
              </div>
              <div className="flex items-center">
                <Image
                  src="/icons/three-dots.svg"
                  width={28}
                  height={28}
                  alt="nav"
                  className="rotate-90 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LatestPodcasts;
