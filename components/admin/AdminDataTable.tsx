import Link from "next/link";

type Column = {
  key: string;
  label: string;
};

type Row = Record<string, React.ReactNode>;

type Props = {
  columns:    Column[];
  rows:       Row[];
  editBase?:  string;
  deleteAction?: (formData: FormData) => Promise<void>;
};

export default function AdminDataTable({ columns, rows, editBase, deleteAction }: Props) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {columns.map((c) => (
                <th key={c.key} className="px-4 py-3 text-left text-[10px] text-white/25 font-semibold uppercase tracking-wider">
                  {c.label}
                </th>
              ))}
              {(editBase || deleteAction) && (
                <th className="px-4 py-3 text-right text-[10px] text-white/25 font-semibold uppercase tracking-wider w-28">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-3 text-white/55 max-w-[200px] truncate">
                    {row[c.key]}
                  </td>
                ))}
                {(editBase || deleteAction) && (
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {editBase && (
                        <Link href={`${editBase}/${row["id"]}/edit`}
                          className="text-[10px] px-2.5 py-1 rounded-lg border border-cyan-500/25 text-cyan-400/70 hover:text-cyan-400 hover:border-cyan-500/40 transition-all">
                          Edit
                        </Link>
                      )}
                      {deleteAction && (
                        <form action={deleteAction}>
                          <input type="hidden" name="id" value={String(row["id"])} />
                          <button type="submit"
                            className="text-[10px] px-2.5 py-1 rounded-lg border border-rose-500/20 text-rose-400/50 hover:text-rose-400 hover:border-rose-500/40 transition-all"
                            onClick={(e) => { if (!confirm("ยืนยันการลบ?")) e.preventDefault(); }}>
                            Delete
                          </button>
                        </form>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
