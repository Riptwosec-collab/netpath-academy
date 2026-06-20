import { roadmap } from "@/data/roadmap";
import RoadmapLevelCard from "./RoadmapLevelCard";

export default function RoadmapTimeline() {
  return (
    <div className="flex flex-col gap-4">
      {roadmap.map((level) => (
        <RoadmapLevelCard key={level.level} level={level as any} />
      ))}
    </div>
  );
}
