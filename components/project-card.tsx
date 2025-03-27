"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image: string
}

const ProjectCard = ({ title, description, tags, image }: ProjectCardProps) => {
  return (
    <motion.div
      className="rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-black/50 h-full flex flex-col"
      whileHover={{
        scale: 1.03,
        boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)",
        borderColor: "rgba(147, 51, 234, 0.5)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="relative h-48 overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Image height={400} width={600} src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </motion.div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">{description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.slice(0, 4).map((tag) => (
            <motion.span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(147, 51, 234, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              {tag}
            </motion.span>
          ))}
          {tags.length > 4 && (
            <motion.span
              className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10"
              whileHover={{ scale: 1.1 }}
            >
              +{tags.length - 4} more
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard

