import Image from "next/image";
import React from "react";
import profileCharacter from "../../../public/character.png";
import wechat from "../../../public/wechat.jpg";

const AboutCoverSection = () => {
  return (
    <section className="w-full md:h-[75vh] border-b-2 border-solid border-dark dark:border-light flex flex-col md:flex-row items-center justify-center text-dark dark:text-light">
      <div className="w-full md:w-1/2 h-full border-r-2 border-solid border-dark dark:border-light flex justify-center">
        <Image
          src={profileCharacter}
          className="w-4/5  xs:w-3/4 md:w-full h-full object-contain object-center"
          priority
          sizes="(max-width: 768px) 100vw,(max-width: 1180px) 50vw, 50vw"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col text-left items-start justify-center px-5 xs:p-10 pb-10 lg:px-16">
        <h2 className="font-bold capitalize text-4xl xs:text-5xl sxl:text-6xl  text-center lg:text-left">
          About Me
        </h2>
        <p className="font-medium capitalize mt-4 text-base">
          My name is Han Jiajun, I am a passionate (react,vue) front-end
          development and{" "}
          <span className="text-lg font-extrabold text-green-700">
            full-stack development
          </span>
          engineer, currently in Henan, China. If you are interested in my
          skills and experience please feel free to contact me.
        </p>
        <p className="font-medium capitalize mt-4 text-base">
          我是韩佳骏， 一名充满热情的react,vue前端开发者和
          全栈开发工程师，目前居住在中国河南。
          如果您对我的技能和经验感兴趣，请随时 联络我
        </p>
        <Image src={wechat} className="w-80 mt-5" />
      </div>
    </section>
  );
};

export default AboutCoverSection;
