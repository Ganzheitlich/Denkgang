import type { KnowledgeBlock } from "@/lib/knowledgeBlocks";

export function KnowledgeBlockView({ block, index }: { block: KnowledgeBlock; index: number }) {
  return (
    <div className="kb-block" key={index}>
      {block.heading && <div className="kb-heading">{block.heading}</div>}
      {block.type === "text" && <div className="kb-text">{block.text}</div>}
      {block.type === "list" && (
        <ul className="kb-list">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
      {block.type === "table" && (
        <div className="kb-table-wrap">
          <table className="kb-table">
            <thead>
              <tr>
                {block.columns.map((col, i) => (
                  <th key={i}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
