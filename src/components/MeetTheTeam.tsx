"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

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
    <section className="bg-white px-4 md:px-10 py-28 shadow-2xl">
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
          className="text-center text-3xl sm:text-4xl font-bold mb-16"
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
              <Card className="group relative rounded-[36px] border border-red-600 bg-[#cfcfcf] shadow-2xl transform ease-in-out cursor-pointer transition-transform duration-300 hover:scale-105">
                <CardContent className="px-10 text-center">

                  {/* Avatar */}
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

                  {/* Name Banner */}
                  <motion.div
                    className="mx-auto mb-4 w-fit bg-red-600 px-8 py-2 text-white text-lg font-bold [clip-path:polygon(0%_0%,100%_0%,85%_100%,15%_100%)] transform transition-all duration-500"
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

                  {/* Designation */}
                  <motion.p
                    className="text-xl font-semibold mb-8 transform transition-all duration-500"
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

                  {/* Details */}
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
                      <span className="font-semibold text-red-600">
                        Superpower:
                      </span>{" "}
                      {member.superpower}
                    </p>
                    <p>
                      <span className="font-semibold text-red-600">
                        Favourite Team:
                      </span>{" "}
                      {member.favouriteTeam}
                    </p>
                  </motion.div>

                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Custom clip path */}
      <style jsx>{`
        .clip-path-name {
          clip-path: polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%);
        }
      `}</style>
    </section>
  );
}
