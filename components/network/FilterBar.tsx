'use client';

import { useEffect, useRef, useState } from 'react';
import type { FilterGroup } from '@/lib/networkFilters';

const ChevronDown = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/**
 * Pinterest-style filter bar (shared by Network + Companies): each group is a
 * dropdown of searchable multi-select checkboxes. Toggling any option calls
 * onToggle immediately — the directory re-filters live, with no Apply step.
 */
export function FilterBar({
  groups,
  filters,
  onToggle,
  onClearAll,
}: {
  groups: FilterGroup[];
  filters: Record<string, string[]>;
  onToggle: (group: string, value: string) => void;
  onClearAll: () => void;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [queries, setQueries] = useState<Record<string, string>>({});
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (barRef.current && !barRef.current.contains(e.target as Node)) setOpenId(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenId(null);
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const total = Object.values(filters).reduce((n, arr) => n + arr.length, 0);

  return (
    <div className="net-filterbar" ref={barRef}>
      <span className="net-scope">All</span>

      {groups.map((group) => {
        const selected = filters[group.id] ?? [];
        const isOpen = openId === group.id;
        const q = (queries[group.id] ?? '').toLowerCase();
        const visible = group.options.filter((o) => o.toLowerCase().includes(q));

        return (
          <div className="net-filter" key={group.id}>
            <button
              type="button"
              className={`net-filter-btn${selected.length ? ' has-active' : ''}`}
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : group.id)}
            >
              {group.buttonLabel}
              {selected.length ? <span className="net-filter-count">{selected.length}</span> : null}
              {ChevronDown}
            </button>

            {isOpen ? (
              <div className="net-filter-pop" role="dialog" aria-label={group.buttonLabel}>
                <div className="net-filter-search">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  <input
                    type="text"
                    placeholder={group.searchPlaceholder}
                    value={queries[group.id] ?? ''}
                    onChange={(e) => setQueries((s) => ({ ...s, [group.id]: e.target.value }))}
                    autoFocus
                  />
                </div>
                <div className="net-filter-list">
                  {visible.length === 0 ? (
                    <span className="net-check__empty">No matches</span>
                  ) : (
                    visible.map((option) => (
                      <label className="net-check" key={option}>
                        <input
                          type="checkbox"
                          checked={selected.includes(option)}
                          onChange={() => onToggle(group.id, option)}
                        />
                        {option}
                      </label>
                    ))
                  )}
                </div>
              </div>
            ) : null}
          </div>
        );
      })}

      {total > 0 ? (
        <button type="button" className="net-clear-all" onClick={onClearAll}>
          Clear all
        </button>
      ) : null}
    </div>
  );
}
