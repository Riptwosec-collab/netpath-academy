import { allSkills } from "@/data/portfolio";

export default function SkillShowcase() {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
      <h2 className="text-xs font-semibold text-white/50 mb-3">Skill Showcase</h2>
      <div className="flex flex-wrap gap-2">
        {allSkills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 rounded-lg border border-[#38bdf8]/20 bg-[#38bdf8]/[0.06]
                       text-xs text-[#38bdf8]/70 font-medium hover:border-[#38bdf8]/40 hover:text-[#38bdf8]
                       transition-all cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
