import Image from "next/image";

export const Hero = () => {
  return (
    <div
      className={
        "relative overflow-x-clip bg-[#B7D5F4] p-4 py-12 text-xl text-gray-700"
      }
    >
      <p className={"w-[64%] leading-10"}>
        Ta boussole pour naviguer avec succès vers l'âge adulte, t'accompagner
        dans tes démarches et faciliter ton insertion
      </p>
      <Image
        src={"/images/hero-image.jpg"}
        alt={"nice pics"}
        width={300}
        height={"300"}
        className={
          "absolute -right-40 top-16 aspect-square rounded-full object-cover object-left xs:-right-28"
        }
      ></Image>
    </div>
  );
};
