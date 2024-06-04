"use client";

import PodcastCard from "@/components/PodcastCard";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LatestPodcasts from "@/components/LatestPodcasts";
import LoaderSpinner from "@/components/LoaderSpinner";

const Home = () => {
  const trendingPodcasts = useQuery(api.podcasts.getTrendingPodcasts);

  if (!trendingPodcasts) return <LoaderSpinner />;

  return (
    <div className="mt-9 flex flex-col gap-9 md:overflow-hidden">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>
        <div className="podcast_grid mb-6">
          {trendingPodcasts?.map((podcast) => (
            <PodcastCard
              key={podcast._id}
              imgUrl={podcast.imageUrl!}
              title={podcast.podcastTitle}
              description={podcast.podcastDescription}
              podcastId={podcast._id}
            />
          ))}
        </div>
        <LatestPodcasts />
      </section>
    </div>
  );
};

export default Home;
