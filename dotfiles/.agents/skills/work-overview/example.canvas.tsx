import {
  Divider,
  Grid,
  H1,
  H3,
  Row,
  Stack,
  Stat,
  Text,
  useHostTheme,
} from "cursor/canvas";

type Category = {
  id: string;
  label: string;
  light: string;
  dark: string;
};

type Unit = {
  id?: string;
  name: string;
  href?: string;
  lines: Partial<Record<string, number>>;
  highlight?: string;
};

type Group = {
  header?: string;
  href?: string;
  units: Unit[];
};

type Numbered = Unit & { n: number };

const work = {
  title: "Backstage cue handoff",
  subtitle:
    "Take scene cues off the puppeteer's live line and make the handoff a contract the stage manager can trust.",
  unitLabel: "Commits",
  duration: "6 days",
  linesBefore: 12_480,
  period: "12–18 Apr 2026",
  categories: [
    { id: "code", label: "Product code", light: "#7A9EC4", dark: "#A8C4E0" },
    { id: "config", label: "Configuration", light: "#C49490", dark: "#E0C0BA" },
    { id: "tests", label: "Tests", light: "#7EAE8C", dark: "#A8D4B4" },
    { id: "docs", label: "Documentation", light: "#D4B48A", dark: "#E8D0A8" },
    { id: "tooling", label: "Development tooling", light: "#A894C4", dark: "#C8B8E0" },
  ] satisfies Category[],
  groups: [
    {
      header: "#184 Extract the cue rack",
      href: "https://github.com/example/marionette/pull/184",
      units: [
        {
          id: "a3f2c1",
          name: "Extract CueRack from the live line",
          lines: { code: 120, config: 8, tests: 10, docs: 4 },
        },
        {
          id: "8b91d0",
          name: "Wire CueRack into the stage manager's desk",
          lines: { code: 30, config: 8 },
        },
        {
          id: "c4e2a1",
          name: "Cover dropped cues and curtain stalls",
          lines: { code: 4, tests: 90 },
        },
      ],
    },
    {
      header: "#191 Playbills and the fly-system clock",
      href: "https://github.com/example/marionette/pull/191",
      units: [
        {
          id: "d17a3b",
          name: "Document string-tension checks for the evening crew",
          lines: { config: 5, docs: 36 },
        },
        {
          id: "f902e8",
          name: "Rewrite scene encoding onto punch cards",
          lines: { code: 760, config: 100, tests: 22, docs: 8 },
          highlight:
            "About ten times larger than neighboring commits, and almost entirely product code in a pull request otherwise about playbills and the fly-system clock.",
        },
        {
          id: "e4b3c2",
          name: "Tighten the fly-system clock and lint config",
          lines: { tooling: 12 },
        },
        {
          id: "91aa04",
          name: "Drop unused gel-swap helpers",
          lines: { code: -24, config: -4 },
        },
      ],
    },
    {
      header: "main",
      units: [
        {
          id: "b2c1d0",
          name: "Fix playbill typo",
          lines: { docs: 2 },
        },
        {
          id: "7e90ab",
          name: "Bump default curtain fade to three seconds",
          lines: { code: 2, config: 4 },
        },
      ],
    },
  ] as Group[],
};

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const categories = work.categories;

function net(unit: Unit): number {
  return categories.reduce((sum, { id }) => sum + (unit.lines[id] ?? 0), 0);
}

function formatDelta(n: number): string {
  const abs = Math.abs(n).toLocaleString("en-US");
  if (n > 0) return `+${abs}`;
  if (n < 0) return `−${abs}`;
  return "0";
}

function colorFor(id: string, kind: string): string {
  const category = categories.find((entry) => entry.id === id)!;
  return kind === "light" ? category.light : category.dark;
}

function niceCeil(n: number): number {
  if (n <= 0) return 0;
  const mag = 10 ** Math.floor(Math.log10(n));
  const err = n / mag;
  const nice = err <= 1 ? 1 : err <= 2 ? 2 : err <= 5 ? 5 : 10;
  return nice * mag;
}

function axisLabel(unit: Numbered): string {
  const raw = unit.id ?? unit.name;
  return raw.length > 10 ? `${raw.slice(0, 9)}…` : raw;
}

function groupLabel(header: string | undefined, width: number) {
  if (!header) return;
  if (width >= 120) return header;
  if (width >= 36) return header.split(/\s+/)[0];
}

const groups = work.groups.map((group, gi, all) => {
  const start = all.slice(0, gi).reduce((sum, entry) => sum + entry.units.length, 0);
  return {
    ...group,
    units: group.units.map((unit, i) => ({ ...unit, n: start + i + 1 })),
  };
});
const units = groups.flatMap((group) => group.units);
const count = units.length;
const netDelta = units.reduce((sum, unit) => sum + net(unit), 0);
const indexWidth = `${String(count).length + 1}ch`;
const idWidth = `${units.reduce((max, unit) => Math.max(max, unit.id?.length ?? 0), 0)}ch`;

const chartLabels = ["0", ...units.map(axisLabel)];
const chartSeries: Record<string, number[]> = Object.fromEntries(
  categories.map(({ id }) => [id, [0]]),
);
for (const unit of units) {
  for (const { id } of categories) {
    const prev = chartSeries[id][chartSeries[id].length - 1];
    chartSeries[id].push(prev + (unit.lines[id] ?? 0));
  }
}

function Swatch({ id, size }: { id: string; size: number }) {
  const theme = useHostTheme();
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 2,
        background: colorFor(id, theme.kind),
        flexShrink: 0,
      }}
    />
  );
}

function smoothPath(
  values: number[],
  xAt: (i: number) => number,
  yAt: (v: number) => number,
): string {
  const pts = values.map((v, i) => ({ x: xAt(i), y: yAt(v) }));
  if (pts.length < 2) return "";
  const t = 0.22;
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    d += ` C ${p1.x + (p2.x - p0.x) * t} ${p1.y + (p2.y - p0.y) * t}, ${p2.x - (p3.x - p1.x) * t} ${p2.y - (p3.y - p1.y) * t}, ${p2.x} ${p2.y}`;
  }
  return d;
}

function CategoryChart() {
  const theme = useHostTheme();
  const values = categories.flatMap(({ id }) => chartSeries[id]);
  const peak = Math.max(0, ...values);
  const trough = Math.min(0, ...values);
  const yMax = niceCeil(peak) || niceCeil(1);
  const yMin =
    trough < 0 ? -niceCeil(Math.abs(trough)) : -Math.round(yMax * 0.08);
  const step = niceCeil(yMax / 4);
  const ticks = [0];
  for (let v = step; v <= yMax; v += step) ticks.push(v);
  for (let v = -step; v >= yMin; v -= step) ticks.push(v);
  ticks.sort((a, b) => a - b);

  const width = 720;
  const plotH = 180;
  const titleX = 12;
  const tickW = Math.max(...ticks.map((tick) => String(tick).length)) * 7;
  const left = titleX + 14 + tickW;
  const right = 12;
  const bottom = 28;
  const plotW = width - left - right;
  const n = chartLabels.length;
  const axis = theme.text.tertiary;
  const grid = theme.stroke.tertiary;
  const rule = theme.stroke.secondary;
  const mark = n <= 20;
  const showGroups = groups.length > 1;

  const bands: { x: number; w: number; href?: string; label?: string }[] = [];
  let cursor = 0;
  for (const group of groups) {
    const w = (group.units.length / count) * plotW;
    bands.push({
      x: left + (cursor / count) * plotW,
      w,
      href: group.href,
      label: groupLabel(group.header, w),
    });
    cursor += group.units.length;
  }
  const labelH = showGroups && bands.some((band) => band.label) ? 18 : 0;
  const top = 12 + labelH;
  const height = top + plotH + bottom;
  const xAt = (i: number) => left + (i / Math.max(n - 1, 1)) * plotW;
  const yAt = (v: number) => top + plotH * (1 - (v - yMin) / (yMax - yMin));

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      style={{ height: "auto", display: "block" }}
      role="img"
      aria-label="Cumulative net lines of code by category"
    >
      {showGroups ? (
        <defs>
          {bands.map((band, i) => (
            <clipPath key={i} id={`group-label-${i}`}>
              <rect x={band.x} y={0} width={Math.max(band.w, 0)} height={labelH} />
            </clipPath>
          ))}
        </defs>
      ) : null}
      {ticks.map((tick) => (
        <g key={tick}>
          <line
            x1={left}
            x2={width - right}
            y1={yAt(tick)}
            y2={yAt(tick)}
            stroke={grid}
            strokeWidth={tick === 0 ? 1.25 : 1}
          />
          <text
            x={left - 8}
            y={yAt(tick) + 3}
            textAnchor="end"
            fill={axis}
            fontSize={10}
          >
            {tick}
          </text>
        </g>
      ))}
      {showGroups
        ? bands.slice(0, -1).map((band, i) => (
            <line
              key={`rule-${i}`}
              x1={band.x + band.w}
              x2={band.x + band.w}
              y1={top}
              y2={top + plotH}
              stroke={rule}
              strokeWidth={1}
            />
          ))
        : null}
      {showGroups
        ? bands.map((band, i) => {
            if (!band.label) return null;
            const label = (
              <text
                x={band.x + band.w / 2}
                y={12}
                textAnchor="middle"
                fill={axis}
                fontSize={10}
                clipPath={`url(#group-label-${i})`}
              >
                {band.label}
              </text>
            );
            return band.href ? (
              <a key={`label-${i}`} href={band.href}>
                {label}
              </a>
            ) : (
              <g key={`label-${i}`}>{label}</g>
            );
          })
        : null}
      <text
        x={titleX}
        y={top + plotH / 2}
        textAnchor="middle"
        fill={axis}
        fontSize={10}
        transform={`rotate(-90 ${titleX} ${top + plotH / 2})`}
      >
        Lines of code
      </text>
      {categories.map(({ id }) => (
        <g key={id}>
          <path
            d={smoothPath(chartSeries[id], xAt, yAt)}
            fill="none"
            stroke={colorFor(id, theme.kind)}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {mark
            ? chartSeries[id].map((value, i) => (
                <circle
                  key={`${id}-${i}`}
                  cx={xAt(i)}
                  cy={yAt(value)}
                  r={2.5}
                  fill={colorFor(id, theme.kind)}
                />
              ))
            : null}
        </g>
      ))}
      {mark
        ? chartLabels.map((label, i) => (
            <text
              key={`${label}-${i}`}
              x={xAt(i)}
              y={height - 8}
              textAnchor="middle"
              fill={axis}
              fontSize={10}
            >
              {label}
            </text>
          ))
        : null}
    </svg>
  );
}

function CategoryLegend() {
  return (
    <Row gap={16} wrap>
      {categories.map(({ id, label }) => (
        <div key={id}>
          <Row gap={6} align="center">
            <Swatch id={id} size={10} />
            <Text size="small" tone="secondary">
              {label}
            </Text>
          </Row>
        </div>
      ))}
    </Row>
  );
}

function MixBar({ lines }: { lines: Unit["lines"] }) {
  const theme = useHostTheme();
  const entries = categories
    .map((category) => ({
      ...category,
      value: lines[category.id] ?? 0,
    }))
    .filter((entry) => entry.value !== 0);
  const total = entries.reduce((sum, entry) => sum + Math.abs(entry.value), 0);
  if (total === 0) return null;
  return (
    <Stack gap={6}>
      <div
        style={{
          display: "flex",
          height: 6,
          borderRadius: 2,
          overflow: "hidden",
          background: theme.fill.tertiary,
        }}
      >
        {entries.map((entry) => (
          <div
            key={entry.id}
            style={{
              width: `${(Math.abs(entry.value) / total) * 100}%`,
              background: colorFor(entry.id, theme.kind),
            }}
          />
        ))}
      </div>
      <Row gap={12} wrap>
        {entries.map((entry) => (
          <div key={entry.id}>
            <Row gap={6} align="center">
              <Swatch id={entry.id} size={8} />
              <Text size="small" tone="tertiary">
                {entry.label} {formatDelta(entry.value)}
              </Text>
            </Row>
          </div>
        ))}
      </Row>
    </Stack>
  );
}

function ArrowMark({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M5 4.5h6.5V11M11.5 4.5 4.5 11.5"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Linked({ href, children }: { href?: string; children: string }) {
  const theme = useHostTheme();
  if (!href) return <>{children}</>;
  return (
    <a
      href={href}
      style={{
        color: "inherit",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      {children}
      <ArrowMark size={13} color={theme.text.tertiary} />
    </a>
  );
}

function UnitRow({ unit }: { unit: Numbered }) {
  const theme = useHostTheme();
  const row = (
    <Row gap={12} align="start" justify="space-between">
      <Row gap={12} align="start" style={{ minWidth: 0, flex: 1 }}>
        <Text
          size="small"
          tone="tertiary"
          style={{
            width: indexWidth,
            flexShrink: 0,
            fontVariantNumeric: "tabular-nums",
            paddingTop: 1,
          }}
        >
          {unit.n}.
        </Text>
        {unit.id ? (
          <Text
            size="small"
            weight="medium"
            style={{
              fontFamily: MONO,
              width: idWidth,
              flexShrink: 0,
              paddingTop: 1,
            }}
          >
            {unit.id}
          </Text>
        ) : null}
        <Text style={{ minWidth: 0 }}>
          <Linked href={unit.href}>{unit.name}</Linked>
        </Text>
      </Row>
      <Text
        weight="semibold"
        style={{
          fontVariantNumeric: "tabular-nums",
          flexShrink: 0,
          fontFamily: MONO,
        }}
      >
        {formatDelta(net(unit))}
      </Text>
    </Row>
  );

  if (!unit.highlight) return row;

  return (
    <div
      style={{
        background: theme.fill.tertiary,
        border: `1px solid ${theme.stroke.secondary}`,
        borderRadius: 6,
        padding: 12,
      }}
    >
      <Stack gap={10}>
        {row}
        <Text size="small" tone="secondary">
          {unit.highlight}
        </Text>
        <MixBar lines={unit.lines} />
      </Stack>
    </div>
  );
}

export default function WorkOverview() {
  return (
    <Stack gap={28}>
      <Stack gap={8}>
        <H1>{work.title}</H1>
        <Text tone="secondary">{work.subtitle}</Text>
      </Stack>

      <Grid columns={4} gap={16}>
        <Stat value={String(count)} label={work.unitLabel} />
        <Stat value={work.duration} label="Wall clock" />
        <Stat value={work.linesBefore.toLocaleString("en-US")} label="Lines before" />
        <Stat value={formatDelta(netDelta)} label="Net delta" />
      </Grid>

      <Stack gap={8}>
        <CategoryChart />
        <CategoryLegend />
        <Text size="small" tone="tertiary">
          Cumulative net lines by category · {work.period}
        </Text>
      </Stack>

      <Stack gap={20}>
        {groups.map((group, i) => (
          <div key={group.header ?? i}>
            <Stack gap={10}>
              {i > 0 ? <Divider /> : null}
              {group.header ? (
                <H3>
                  <Linked href={group.href}>{group.header}</Linked>
                </H3>
              ) : null}
              <Stack gap={8}>
                {group.units.map((unit) => (
                  <div key={unit.id ?? `${unit.n}-${unit.name}`}>
                    <UnitRow unit={unit} />
                  </div>
                ))}
              </Stack>
            </Stack>
          </div>
        ))}
      </Stack>
    </Stack>
  );
}
