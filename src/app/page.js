import { allBlogs } from "contentlayer/generated";
import HomeCoverSection from "../components/Home/HomeCoverSection";
import FeaturedPosts from "../components/Home/FeaturedPosts";
import RecentPosts from "../components/Home/RecentPosts";
import Three from "../components/three";

export default function Home() {
  // console.log(allBlogs, "allBlogs");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20 pt-2">
      <Three />
      {/* <HomeCoverSection blogs={allBlogs} /> */}
      <FeaturedPosts blogs={allBlogs} />
      <RecentPosts blogs={allBlogs} />
    </main>
  );
}
