export default function SkillNode({ skill, done = false }: { skill: string; done?: boolean }) {
  return (
    <div className={`px-3 py-1.5 rounded-lg text-xs border ${done ? "border-[#22c55e] text-[#22c55e]" : "border-white/20 text-gray-400"}`}>
      {skill}
    </div>
  );
}
