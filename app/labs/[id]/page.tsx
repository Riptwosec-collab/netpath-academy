import { notFound }          from "next/navigation";
import { getLabById, labs }  from "@/data/labs";
import LabHeader             from "@/components/labs/LabHeader";
import LabTopology           from "@/components/labs/LabTopology";
import LabIpTable            from "@/components/labs/LabIpTable";
import LabTaskList           from "@/components/labs/LabTaskList";
import LabHintBox            from "@/components/labs/LabHintBox";
import LabSolution           from "@/components/labs/LabSolution";
import LabTroubleshooting    from "@/components/labs/LabTroubleshooting";

/* ── Static params for Next.js build ───────────────────────────── */
export function generateStaticParams() {
  return labs.map((lab) => ({ id: lab.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const lab = getLabById(params.id);
  return {
    title: lab ? `${lab.title} | NetPath Academy` : "Lab Not Found",
    description: lab?.objective,
  };
}

/* ── Page ───────────────────────────────────────────────────────── */
export default function LabDetailPage({ params }: { params: { id: string } }) {
  const lab = getLabById(params.id);
  if (!lab) notFound();

  return (
    <div className="px-4 md:px-6 py-6 max-w-5xl mx-auto space-y-5">

      {/* Header — title, scenario, objective */}
      <LabHeader lab={lab} />

      {/* Two-column: Topology + IP Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <LabTopology lab={lab} />
        <LabIpTable  lab={lab} />
      </div>

      {/* Task checklist — client component */}
      <LabTaskList lab={lab} />

      {/* Hints — client component */}
      <LabHintBox lab={lab} />

      {/* Troubleshooting — server */}
      <LabTroubleshooting lab={lab} />

      {/* Solution — client component (locked by default) */}
      <LabSolution lab={lab} />

    </div>
  );
}
