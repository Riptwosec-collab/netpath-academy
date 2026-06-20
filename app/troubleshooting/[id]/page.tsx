import Link                       from "next/link";
import { notFound }                from "next/navigation";
import { getGuideById, troubleshootingGuides } from "@/data/troubleshooting";
import ProblemHeader               from "@/components/troubleshooting/ProblemHeader";
import SymptomBox                  from "@/components/troubleshooting/SymptomBox";
import PossibleCauses              from "@/components/troubleshooting/PossibleCauses";
import TroubleshootingFlow         from "@/components/troubleshooting/TroubleshootingFlow";
import CommandChecklist            from "@/components/troubleshooting/CommandChecklist";
import DecisionTree                from "@/components/troubleshooting/DecisionTree";
import RootCauseExamples           from "@/components/troubleshooting/RootCauseExamples";
import FixActions                  from "@/components/troubleshooting/FixActions";
import VerificationSteps           from "@/components/troubleshooting/VerificationSteps";
import EscalationGuide             from "@/components/troubleshooting/EscalationGuide";
import RcaTemplate                 from "@/components/troubleshooting/RcaTemplate";

export function generateStaticParams() {
  return troubleshootingGuides.map((g) => ({ id: g.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const guide = getGuideById(params.id);
  return {
    title:       guide ? `${guide.title} | Troubleshooting` : "Guide Not Found",
    description: guide?.description,
  };
}

export default function TroubleshootingDetailPage({ params }: { params: { id: string } }) {
  const guide = getGuideById(params.id);

  /* ── Not Found ───────────────────────────────────────────────── */
  if (!guide) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 px-4">
        <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center">
          <svg className="w-7 h-7 text-white/15" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-base font-semibold text-white/60 mb-1">ไม่พบ Troubleshooting Guide นี้</p>
          <p className="text-xs text-white/25">ID: {params.id} ไม่มีในระบบ</p>
        </div>
        <Link href="/troubleshooting"
          className="px-5 py-2.5 rounded-xl bg-[#38bdf8]/15 border border-[#38bdf8]/35 text-[#38bdf8]
                     text-sm font-medium hover:bg-[#38bdf8]/25 transition-all">
          กลับไปรายการ Guide
        </Link>
      </div>
    );
  }

  /* ── Guard: empty data ───────────────────────────────────────── */
  if (!guide.flowSteps?.length && !guide.commands?.length) notFound();

  return (
    <div className="px-4 md:px-6 py-6 max-w-4xl mx-auto space-y-5">

      {/* Back link */}
      <Link href="/troubleshooting"
        className="inline-flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        กลับไปรายการ Troubleshooting Guide
      </Link>

      {/* 1. Hero Header */}
      <ProblemHeader guide={guide} />

      {/* 2 & 3. Symptoms + Possible Causes side-by-side on wide screens */}
      {guide.symptoms?.length > 0 && (
        <SymptomBox symptoms={guide.symptoms} />
      )}
      {guide.possibleCauses?.length > 0 && (
        <PossibleCauses causes={guide.possibleCauses} />
      )}

      {/* 4. Troubleshooting Flow */}
      {guide.flowSteps?.length > 0 && (
        <TroubleshootingFlow steps={guide.flowSteps} />
      )}

      {/* 5. Command Checklist */}
      {guide.commands?.length > 0 && (
        <CommandChecklist commands={guide.commands} />
      )}

      {/* 6. Decision Tree */}
      {guide.decisionTree?.length > 0 && (
        <DecisionTree nodes={guide.decisionTree} />
      )}

      {/* 7. Root Cause Examples */}
      {guide.rootCauseExamples?.length > 0 && (
        <RootCauseExamples examples={guide.rootCauseExamples} />
      )}

      {/* 8. Fix Actions */}
      {guide.fixActions?.length > 0 && (
        <FixActions actions={guide.fixActions} />
      )}

      {/* 9. Verification Steps (interactive checkbox) */}
      {guide.verificationSteps?.length > 0 && (
        <VerificationSteps steps={guide.verificationSteps} />
      )}

      {/* 10. Escalation Guide */}
      {guide.escalation?.length > 0 && (
        <EscalationGuide escalation={guide.escalation} />
      )}

      {/* 11. RCA Template */}
      {guide.rcaTemplate && (
        <RcaTemplate rca={guide.rcaTemplate} />
      )}

      {/* 12. Related Labs / Courses */}
      {(guide.relatedLabs?.length > 0 || guide.relatedCourses?.length > 0) && (
        <div className="grid sm:grid-cols-2 gap-4">
          {guide.relatedLabs?.length > 0 && (
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
              <h3 className="text-xs font-semibold text-white/50 mb-3 flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#38bdf8]/50" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Lab ที่เกี่ยวข้อง
              </h3>
              <div className="flex flex-col gap-1.5">
                {guide.relatedLabs.map((lab) => (
                  <Link key={lab} href={`/labs/${lab}`}
                    className="text-xs text-[#38bdf8]/60 hover:text-[#38bdf8] transition-colors
                               flex items-center gap-1.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    {lab.replace(/-/g, " ")}
                  </Link>
                ))}
              </div>
            </div>
          )}
          {guide.relatedCourses?.length > 0 && (
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
              <h3 className="text-xs font-semibold text-white/50 mb-3 flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#8b5cf6]/50" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Course ที่เกี่ยวข้อง
              </h3>
              <div className="flex flex-col gap-1.5">
                {guide.relatedCourses.map((course) => (
                  <Link key={course} href={`/courses/${course}`}
                    className="text-xs text-[#8b5cf6]/60 hover:text-[#8b5cf6] transition-colors
                               flex items-center gap-1.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    {course.replace(/-/g, " ")}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Back button */}
      <div className="pt-2">
        <Link href="/troubleshooting"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08]
                     text-white/35 text-sm font-medium hover:border-white/20 hover:text-white/60 transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          กลับไปรายการ Guide ทั้งหมด
        </Link>
      </div>
    </div>
  );
}
