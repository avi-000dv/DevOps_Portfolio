interface SkillBadgeProps {
  name: string
}

export default function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <div className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm hover:bg-gray-200 dark:hover:bg-white/10 hover:border-purple-500/50 transition-colors duration-300">
      {name}
    </div>
  )
}

