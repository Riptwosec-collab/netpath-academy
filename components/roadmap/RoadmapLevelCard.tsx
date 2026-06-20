interface Level {
  level: number;
  title: string;
  description: string;
  skills: string[];
  status: "completed" | "in-progress" | "locked";
}

const statusColor = {
  completed: "border-[#22c55e] bg-[#22c55e]/10",
  "in-progress": "border-[#38bdf8] bg-[#38bdf8]/10",
  locked: "border-white/10 bg-white/5 opacity-50",
};

export default function RoadmapLevelCard({ level }: { level: Level }) {
  return (
    <div className={`border rounded-xl p-5 ${statusColor[level.status]}`}>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs font-mono text-gray-400">Level {level.level}</span>
        <span className="text-sm font-bold text-gray-100">{level.title}</span>
        {level.status === "completed" && <span className="ml-auto text-xs text-[#22c55e]">✓ Done</span>}
        {level.status === "in-progress" && <span className="ml-auto text-xs text-[#38bdf8]">● In Progress</span>}
        {level.status === "locked" && <span className="ml-auto text-xs text-gray-500">🔒 Locked</span>}
      </div>
      <p className="text-xs text-gray-400 mb-3">{level.description}</p>
      <div className="flex flex-wrap gap-1">
        {level.skills.map((skill) => (
          <span key={skill} className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300">{skill}</span>
        ))}
      </div>
    </div>
  );
}
