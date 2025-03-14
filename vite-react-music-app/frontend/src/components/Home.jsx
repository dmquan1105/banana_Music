import React from "react";
import Header from "./Header";
import PlaylistCard from "./PlaylistCard";
import RecentlyPlayed from "./RecentlyPlayed";

export default function Home({ isMenuOpen }) {
  return (
    <div className="">
      <Header isMenuOpen={isMenuOpen} />
      <PlaylistCard isMenuOpen={isMenuOpen} />
      <RecentlyPlayed isMenuOpen={isMenuOpen} />
    </div>
  );
}
