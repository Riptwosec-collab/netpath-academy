import { notFound }                    from "next/navigation";
import { getLabById, labs }            from "@/data/labs";
import { getLabInteractive }           from "@/data/labInteractive";
import LabHeader                       from "@/components/labs/LabHeader";
import LabTopology                     from "@/components/labs/LabTopology";
import LabIpTable                      from "@/components/labs/LabIpTable";
import LabHintBox                      from "@/components/labs/LabHintBox";
import LabSolution                     from "@/components/labs/LabSolution";
import LabTroubleshooting              from "@/components/labs/LabTroubleshooting";
import LabInteractiveShell             from "@/components/labs/LabInteractiveShell";

export function generateStaticParams() {
  return labs.map((lab) => ({ id: lab.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const lab = getLabById(params.id);
  return {
    title:       lab ? `${lab.title} | NetPath Academy` : "Lab Not Found",
    description: lab?.objective,
  };
}

export default function LabDetailPage({ params }: { params: { id: string } }) {
  const lab         = getLabById(params.id);
  if (!lab) notFound();

  const interactive = getLabInteractive(params.id);

  return (
    <div className="px-4 md:px-6 py-6 max-w-5xl mx-auto space-y-5">
      <LabHeader lab={lab} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <LabTopology lab={lab} />
        <LabIpTable  lab={lab} />
      </div>

      {interactive ? (
        <LabInteractiveShell
          labId={params.id}
          hostname={interactive.hostname}
          terminalCommands={interactive.terminalCommands}
          steps={interactive.steps}
          configTemplate={interactive.configTemplate}
          configSolution={interactive.configSolution}
        />
      ) : (
        <div className="rounded-xl border border-dashed border-white/10 p-6 text-center text-sm text-white/25">
          Interactive mode not yet available for this lab.
        </div>
      )}

      <LabHintBox lab={lab} />
      <LabTroubleshooting lab={lab} />
      <LabSolution lab={lab} />
    </div>
  );
}
