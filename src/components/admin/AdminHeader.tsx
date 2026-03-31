"use client";

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-[#111] px-10 h-[60px]">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-[#C8251E]" />
        <span className="text-[13px] font-medium text-white tracking-[0.06em]">
          PHOENIX COMMUNICATION
        </span>
        <span className="text-[10px] tracking-[0.1em] uppercase text-[#555] bg-[#1a1a1a] px-2.5 py-1">
          Admin
        </span>
      </div>
      <a
        href="/cs"
        target="_blank"
        className="bg-[#C8251E] text-white text-[11px] font-medium tracking-[0.08em] uppercase px-[22px] py-[9px] hover:bg-[#a01c17] transition-colors no-underline"
      >
        Náhled webu →
      </a>
    </header>
  );
}
