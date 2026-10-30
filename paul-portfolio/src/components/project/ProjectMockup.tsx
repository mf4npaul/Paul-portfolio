import type { ReactNode, SVGProps } from 'react'
import type { MockupKind } from '../../types/project'

/**
 * Built-in interface illustrations, one per project type.
 * They are placeholders: replace them by adding a real screenshot to a project
 * (`thumbnail` in src/data/projects.ts). Colours come from the theme tokens,
 * so they follow the light/dark theme automatically.
 */

const C = {
  surface: 'var(--surface)',
  surface2: 'var(--surface-2)',
  border: 'var(--border)',
  text: 'var(--text)',
  muted: 'var(--muted)',
  accent: 'var(--accent)',
  ok: 'var(--ok)',
  warn: 'var(--warn)',
  info: 'var(--info)',
  danger: 'var(--danger)',
}

type RectProps = Omit<SVGProps<SVGRectElement>, 'fill' | 'stroke'> & { f?: string; s?: string; o?: number }
const R = ({ f = C.surface2, s, o = 1, ...p }: RectProps) => (
  <rect {...p} style={{ fill: f, stroke: s ?? 'none', opacity: o }} />
)
/** A grey line standing in for text. */
const Bar = ({ x, y, w, h = 6, f = C.muted, o = 0.35 }: { x: number; y: number; w: number; h?: number; f?: string; o?: number }) => (
  <R x={x} y={y} width={w} height={h} rx={h / 2} f={f} o={o} />
)
const Dot = ({ cx, cy, r = 4, f }: { cx: number; cy: number; r?: number; f: string }) => (
  <circle cx={cx} cy={cy} r={r} style={{ fill: f }} />
)

function Frame({ children }: { children: ReactNode }) {
  return (
    <>
      <R x={1} y={1} width={478} height={298} rx={14} f={C.surface} s={C.border} />
      <path d="M1 15a14 14 0 0 1 14-14h450a14 14 0 0 1 14 14v14H1z" style={{ fill: C.surface2 }} />
      <Dot cx={20} cy={15} r={3.5} f={C.danger} />
      <Dot cx={33} cy={15} r={3.5} f={C.warn} />
      <Dot cx={46} cy={15} r={3.5} f={C.ok} />
      <R x={150} y={8} width={180} height={14} rx={7} f={C.surface} o={0.8} />
      {children}
    </>
  )
}

function Kanban() {
  const cols = [
    { x: 16, cards: [46, 38, 54], tone: C.info },
    { x: 170, cards: [54, 42], tone: C.warn },
    { x: 324, cards: [38, 50, 40], tone: C.ok },
  ]
  return (
    <>
      <Bar x={16} y={42} w={90} h={10} f={C.text} o={0.75} />
      <R x={380} y={39} width={84} height={16} rx={8} f={C.accent} />
      {cols.map((col, ci) => {
        const y = 70
        return (
          <g key={ci}>
            <R x={col.x} y={y} width={140} height={14} rx={7} f={C.surface2} />
            <Dot cx={col.x + 10} cy={y + 7} r={3} f={col.tone} />
            <Bar x={col.x + 20} y={y + 4} w={50} h={6} o={0.5} />
            {(() => {
              let cy = 94
              return col.cards.map((h, i) => {
                const y0 = cy
                cy += h + 10
                const highlight = ci === 1 && i === 0
                return (
                  <g key={i}>
                    <R x={col.x} y={y0} width={140} height={h} rx={8} f={C.surface2} s={highlight ? C.accent : C.border} />
                    {highlight && <R x={col.x} y={y0 + 8} width={3} height={h - 16} rx={1.5} f={C.accent} />}
                    <Bar x={col.x + 12} y={y0 + 11} w={92 - i * 12} h={6} f={C.text} o={0.7} />
                    <Bar x={col.x + 12} y={y0 + 24} w={64} h={5} />
                    <Dot cx={col.x + 18} cy={y0 + h - 12} r={6} f={col.tone} />
                    <R x={col.x + 96} y={y0 + h - 17} width={30} height={10} rx={5} f={col.tone} o={0.28} />
                  </g>
                )
              })
            })()}
          </g>
        )
      })}
    </>
  )
}

function Storefront() {
  const tiles = [0, 1, 2, 3]
  return (
    <>
      <R x={16} y={40} width={64} height={14} rx={4} f={C.text} o={0.75} />
      <R x={150} y={40} width={200} height={14} rx={7} f={C.surface2} />
      <Dot cx={442} cy={47} r={8} f={C.accent} />
      <R x={16} y={66} width={448} height={70} rx={10} f={C.accent} o={0.16} />
      <Bar x={32} y={82} w={150} h={10} f={C.text} o={0.8} />
      <Bar x={32} y={100} w={110} h={6} />
      <R x={32} y={113} width={64} height={14} rx={7} f={C.accent} />
      <R x={330} y={76} width={120} height={50} rx={8} f={C.surface2} />
      {tiles.map((i) => {
        const x = 16 + i * 114
        return (
          <g key={i}>
            <R x={x} y={148} width={104} height={140} rx={10} f={C.surface2} s={C.border} />
            <R x={x + 8} y={156} width={88} height={66} rx={6} f={C.surface} />
            <rect x={x + 30} y={170} width={44} height={38} rx={4} style={{ fill: i % 2 ? C.info : C.warn, opacity: 0.4 }} />
            <Bar x={x + 10} y={232} w={78} h={6} f={C.text} o={0.65} />
            <Bar x={x + 10} y={244} w={48} h={5} />
            <R x={x + 10} y={262} width={46} height={12} rx={6} f={C.accent} o={0.9} />
            <Dot cx={x + 86} cy={268} r={6} f={C.surface} />
          </g>
        )
      })}
    </>
  )
}

function Tasks() {
  const rows = [
    { w: 150, done: true, tone: C.ok },
    { w: 190, done: false, tone: C.danger },
    { w: 130, done: false, tone: C.warn },
    { w: 170, done: false, tone: C.info },
    { w: 110, done: true, tone: C.ok },
  ]
  return (
    <>
      <R x={1} y={29} width={100} height={270} f={C.surface2} o={0.55} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <Dot cx={20} cy={54 + i * 26} r={4} f={i === 1 ? C.accent : C.muted} />
          <Bar x={32} y={51 + i * 26} w={50 - i * 4} h={6} f={i === 1 ? C.accent : C.muted} o={i === 1 ? 0.9 : 0.4} />
        </g>
      ))}
      <Bar x={120} y={46} w={120} h={11} f={C.text} o={0.75} />
      <R x={392} y={40} width={72} height={22} rx={11} f={C.accent} />
      <R x={120} y={72} width={344} height={20} rx={10} f={C.surface2} />
      {rows.map((r, i) => {
        const y = 104 + i * 36
        return (
          <g key={i}>
            <R x={120} y={y} width={344} height={30} rx={8} f={C.surface2} s={C.border} />
            <circle cx={138} cy={y + 15} r={7} style={{ fill: r.done ? C.ok : 'none', stroke: r.done ? C.ok : C.muted, strokeWidth: 1.5 }} />
            <Bar x={156} y={y + 12} w={r.w} h={6} f={C.text} o={r.done ? 0.35 : 0.75} />
            <R x={382} y={y + 9} width={32} height={12} rx={6} f={r.tone} o={0.3} />
            <Bar x={422} y={y + 12} w={30} h={5} />
          </g>
        )
      })}
    </>
  )
}

function Analytics() {
  const bars = [44, 70, 52, 88, 64, 96, 74]
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <R x={16 + i * 114} y={40} width={104} height={52} rx={10} f={C.surface2} s={C.border} />
          <Bar x={26 + i * 114} y={51} w={44} h={5} />
          <Bar x={26 + i * 114} y={64} w={64 - i * 6} h={11} f={C.text} o={0.8} />
          <Bar x={26 + i * 114} y={80} w={30} h={5} f={i % 2 ? C.danger : C.ok} o={0.8} />
        </g>
      ))}
      <R x={16} y={104} width={290} height={118} rx={10} f={C.surface2} s={C.border} />
      <path d="M28 200 L68 172 L108 184 L148 148 L188 160 L228 128 L268 142 L296 120 L296 212 L28 212Z" style={{ fill: C.accent, opacity: 0.18 }} />
      <path d="M28 200 L68 172 L108 184 L148 148 L188 160 L228 128 L268 142 L296 120" style={{ fill: 'none', stroke: C.accent, strokeWidth: 2.5, strokeLinejoin: 'round' }} />
      <R x={318} y={104} width={146} height={118} rx={10} f={C.surface2} s={C.border} />
      {bars.map((h, i) => (
        <R key={i} x={330 + i * 18} y={212 - h} width={11} height={h} rx={3} f={i === 5 ? C.accent : C.info} o={i === 5 ? 1 : 0.5} />
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <R x={16} y={234 + i * 20} width={448} height={16} rx={6} f={C.surface2} o={i === 0 ? 0.9 : 0.5} />
          <Bar x={26} y={239 + i * 20} w={90} h={5} f={C.text} o={0.5} />
          <Bar x={200} y={239 + i * 20} w={50} h={5} />
          <Bar x={400} y={239 + i * 20} w={50} h={5} />
        </g>
      ))}
    </>
  )
}

function Pipeline() {
  const stages = [
    { x: 20, tone: C.ok },
    { x: 142, tone: C.ok },
    { x: 264, tone: C.warn },
    { x: 386, tone: C.muted },
  ]
  return (
    <>
      <Bar x={16} y={42} w={110} h={10} f={C.text} o={0.75} />
      <R x={396} y={38} width={68} height={18} rx={9} f={C.ok} o={0.25} />
      <Dot cx={408} cy={47} r={3.5} f={C.ok} />
      {stages.map((s, i) => (
        <g key={i}>
          {i < stages.length - 1 && <rect x={s.x + 74} y={95} width={48} height={2.5} style={{ fill: C.border }} />}
          <R x={s.x} y={74} width={74} height={44} rx={10} f={C.surface2} s={s.tone === C.muted ? C.border : s.tone} />
          <Dot cx={s.x + 14} cy={90} r={4} f={s.tone} />
          <Bar x={s.x + 24} y={87} w={34} h={6} f={C.text} o={0.6} />
          <Bar x={s.x + 12} y={102} w={44} h={5} />
        </g>
      ))}
      <R x={16} y={134} width={290} height={154} rx={10} f={C.surface2} s={C.border} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <Dot cx={32} cy={156 + i * 26} r={4} f={i === 2 ? C.warn : C.ok} />
          <Bar x={46} y={153 + i * 26} w={110 - (i % 3) * 14} h={6} f={C.text} o={0.6} />
          <Bar x={200} y={153 + i * 26} w={44} h={5} />
          <Bar x={262} y={153 + i * 26} w={30} h={5} />
        </g>
      ))}
      <R x={318} y={134} width={146} height={154} rx={10} f={C.surface2} s={C.border} />
      <Bar x={330} y={146} w={60} h={6} f={C.text} o={0.6} />
      {Array.from({ length: 24 }).map((_, i) => (
        <R key={i} x={330 + (i % 8) * 15} y={166 + Math.floor(i / 8) * 15} width={10} height={10} rx={2.5} f={i === 13 ? C.warn : C.ok} o={i === 13 ? 0.9 : 0.55} />
      ))}
      <path d="M330 262 L354 252 L378 258 L402 244 L426 250 L452 238" style={{ fill: 'none', stroke: C.accent, strokeWidth: 2, strokeLinejoin: 'round' }} />
    </>
  )
}

function Calendar() {
  const selected = 16
  const booked = [4, 9, 10, 17, 23]
  return (
    <>
      <Bar x={16} y={42} w={90} h={10} f={C.text} o={0.75} />
      <R x={16} y={64} width={296} height={224} rx={10} f={C.surface2} s={C.border} />
      {['', '', '', '', '', '', ''].map((_, i) => (
        <Bar key={i} x={30 + i * 40} y={76} w={14} h={5} />
      ))}
      {Array.from({ length: 35 }).map((_, i) => {
        const col = i % 7
        const row = Math.floor(i / 7)
        const x = 24 + col * 40
        const y = 92 + row * 38
        const isSel = i === selected
        const isBooked = booked.includes(i)
        return (
          <g key={i}>
            <R x={x} y={y} width={34} height={32} rx={8} f={isSel ? C.accent : C.surface} o={isSel ? 1 : 0.8} />
            {isBooked && <Dot cx={x + 17} cy={y + 24} r={2.5} f={C.info} />}
            <Bar x={x + 11} y={y + 8} w={12} h={5} f={isSel ? C.surface : C.text} o={isSel ? 0.9 : 0.4} />
          </g>
        )
      })}
      <R x={324} y={64} width={140} height={224} rx={10} f={C.surface2} s={C.border} />
      <Bar x={336} y={78} w={70} h={7} f={C.text} o={0.7} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <R x={336} y={98 + i * 32} width={116} height={24} rx={8} f={i === 2 ? C.accent : C.surface} o={i === 2 ? 1 : 0.85} s={i === 2 ? undefined : C.border} />
          <Bar x={346} y={107 + i * 32} w={40} h={5} f={i === 2 ? C.surface : C.text} o={i === 2 ? 0.9 : 0.45} />
        </g>
      ))}
    </>
  )
}

const kinds: Record<MockupKind, () => ReactNode> = {
  kanban: Kanban,
  storefront: Storefront,
  tasks: Tasks,
  analytics: Analytics,
  pipeline: Pipeline,
  calendar: Calendar,
}

export function ProjectMockup({ kind, label, className }: { kind: MockupKind; label: string; className?: string }) {
  const Art = kinds[kind]
  return (
    <svg viewBox="0 0 480 300" role="img" aria-label={label} className={className} preserveAspectRatio="xMidYMid meet">
      <Frame>
        <Art />
      </Frame>
    </svg>
  )
}
