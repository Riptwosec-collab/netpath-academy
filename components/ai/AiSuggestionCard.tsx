export default function AiSuggestionCard({ title, prompt }: { title: string; prompt: string }) {
  return (
    <div className="bg-white/5 border border-[#8b5cf6]/20 rounded-xl p-4 hover:border-[#8b5cf6]/50 cursor-pointer transition-colors">
      <p className="text-sm font-medium text-[#8b5cf6]">{title}</p>
      <p className="text-xs text-gray-400 mt-1">{prompt}</p>
    </div>
  );
}
