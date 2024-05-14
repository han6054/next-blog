"use client";
import { allBlogs } from "contentlayer/generated";
import HomeCoverSection from "../components/Home/HomeCoverSection";
import FeaturedPosts from "../components/Home/FeaturedPosts";
import RecentPosts from "../components/Home/RecentPosts";
import Three from "../components/three";
import { useEffect } from "react";

export default function Home() {
  const textFault = () => {
    let player = null;
    const texts = [...document.getElementsByClassName("faulttext")];
    setTimeout(() => {
      clearInterval(player);
      texts.forEach((text) => {
        text.classList.remove("faulttext_fault");
        text.style.transform = "";
        text.style.clipPath = "";
      });
    }, 500);
    player = setInterval(() => {
      texts.forEach((text) => {
        text.classList.add("faulttext_fault");
        text.style.transform = `translate(${Math.random()}%,${
          Math.random() * 60 - 30
        }%)`;
        let x = Math.random() * 100;
        let y = Math.random() * 100;
        let h = Math.random() * 50 + 50;
        let w = Math.random() * 40 + 10;
        text.style.clipPath = `polygon(${x}% ${y}%, ${x + w}% ${y}%, ${
          x + w
        }% ${y + h}%, ${x}% ${y + h}%)`;
      });
    }, 80);
  };

  useEffect(() => {
    textFault();
    setInterval(() => {
      textFault();
    }, 2000);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20 pt-2">
      <div className="relative">
        <div className="w-full text-center font-bold  pt-[150px] absolute flex justify-center items-center">
          <div className="text-2xl md:text-4xl text-light faulttext faulttext_fault">
            WELCOME TO JIAJUN'S SPACE
          </div>
          <div className="text-2xl md:text-4xl text-light faulttext faulttext_fault">
            WELCOME TO JIAJUN'S SPACE
          </div>
          <div className="text-2xl md:text-4xl text-light faulttext faulttext_fault">
            WELCOME TO JIAJUN'S SPACE
          </div>
        </div>
        <Three />
      </div>
      {/* <HomeCoverSection blogs={allBlogs} /> */}
      <FeaturedPosts blogs={allBlogs} />
      <RecentPosts blogs={allBlogs} />
    </main>
  );
}
