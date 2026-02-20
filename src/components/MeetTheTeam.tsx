"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import MeetTheTeamCardShape from "./ui/MeetTheTeamCardShape";

type TeamMember = {
  name: string;
  designation: string;
  superpower: string;
  favouriteTeam: string;
  image: string;
};

interface MeetTheTeamProps {
  members: TeamMember[];
}

export default function MeetTheTeam({ members }: MeetTheTeamProps) {
  return (
    <section className="px-4 md:px-10 pt-10 pb-15 shadow-2xl">
      <motion.div
        className="mx-auto max-w-7xl md:px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              staggerChildren: 0.2,
              delayChildren: 0.1
            }
          }
        }}
      >

        {/* Heading */}
        <motion.h2
          className="text-center text-3xl sm:text-4xl font-bold mb-16 text-white"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }
            }
          }}
        >
          Meet the Team
        </motion.h2>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {members.map((member, index) => (
            <motion.div
              key={index}
              className="relative w-full h-100"
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                },
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
            >
              {/* SVG Border */}
              <MeetTheTeamCardShape />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center px-6 h-full justify-center">

                {/* Designation Badge (Responsive Safe) */}
                <div className="absolute -top-1.5 px-4 py-1 text-white text-lg text-center">
                  {member.designation}
                </div>

                {/* Profile Image */}
                <div className="w-28 h-28 -m-2 rounded-full overflow-hidden border-4 border-gray-400 mt-0 mb-7">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={112}
                    height={112}
                    className="object-cover"
                  />
                </div>

                {/* Name Ribbon */}
                <div className="relative mb-6">
                  <div className="bg-[#960018] text-white px-10 py-2 font-semibold text-lg relative"
                  style={{
                background: "linear-gradient(90deg, #a00015, #e00022)",
                clipPath:
                  "polygon(8% 0, 92% 0, 100% 50%, 92% 100%, 8% 100%, 0% 50%)",
              }}>
                    {member.name}
                  </div>
                </div>

                {/* Details */}
                <p className="text-lg mb-4 text-left">
                  <span className="text-[#960018] font-medium">Superpower:</span>{" "}
                  <span className="text-[#c3c3c3]">{member.superpower}</span>
                </p>

                <p className="text-lg pb-1 text-left">
                  <span className="text-[#960018] font-medium">Favourite Team:</span>{" "}
                  <span className="text-[#c3c3c3]">{member.favouriteTeam}</span>
                </p>

              </div>
            </motion.div>
          ))}
        </motion.div>
        {/* <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-14"
          variants={{
            visible: { 
              transition: { 
                staggerChildren: 0.15,
                delayChildren: 0.2
              } 
            }
          }}
        >
          {members.map((member, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { 
                    duration: 0.8, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: index * 0.1
                  } 
                }
              }}
            >
              <Card className="group relative rounded-none bg-[#202020] shadow-2xl transform ease-in-out cursor-pointer transition-transform duration-300 hover:scale-105">
                <CardContent className="px-10 text-center">

                  Avatar
                  <motion.div
                    className="mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full bg-white transform transition-all duration-500"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: 0.3 + index * 0.1
                    }}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </motion.div>

                  Name Banner
                  <motion.div
                    className="mx-auto mb-4 w-fit bg-[#960018] px-8 py-2 text-white text-lg font-bold [clip-path:polygon(0%_0%,100%_0%,85%_100%,15%_100%)] transform transition-all duration-500"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: 0.4 + index * 0.1
                    }}
                  >
                    {member.name}
                  </motion.div>

                  Designation
                  <motion.p
                    className="text-xl font-semibold mb-8 transform transition-all duration-500 text-white"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: 0.5 + index * 0.1
                    }}
                  >
                    {member.designation}
                  </motion.p>

                  Details
                  <motion.div
                    className="space-y-4 text-lg transform transition-all duration-500"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: 0.6 + index * 0.1
                    }}
                  >
                    <p>
                      <span className="font-normal text-[#960018]">
                        Superpower:
                      </span>{" "}
                      <span className="text-[#c3c3c3]">{member.superpower}</span>
                    </p>
                    <p>
                      <span className="font-normal text-[#960018]">
                        Favourite Team:
                      </span>{" "}
                      <span className="text-[#c3c3c3]">{member.favouriteTeam}</span>
                    </p>
                  </motion.div>

                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div> */}
      </motion.div>

      {/* Custom clip path */}
      <style jsx>{`
        .clip-left {
            clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
          }
        .clip-right {
            clip-path: polygon(15% 0, 100% 0, 100% 100%, 0 100%);
          }
      `}</style>
    </section>
  );
}