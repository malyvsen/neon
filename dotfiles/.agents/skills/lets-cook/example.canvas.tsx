import {
  Grid,
  H1,
  Stack,
  Text,
  useCanvasState,
  type CSSProperties,
} from "cursor/canvas";

type Language = "en" | "pl";

/** Printed as `amount + name`, so the name follows the amount: "½ tsp salt" / "szczypta soli". */
type Ingredient = {
  id: string;
  amount: string;
  name: string;
};

type IngredientGroup = {
  name: string;
  items: Ingredient[];
};

type Step = {
  id: string;
  title: string;
  start: number;
  end: number;
  instructions: string[];
};

type NutrientId =
  | "energy"
  | "fat"
  | "saturates"
  | "carbs"
  | "sugars"
  | "protein"
  | "salt";

type Nutrient = {
  id: NutrientId;
  value: string;
  intake: string;
};

type Utensil = {
  id: string;
  name: string;
};

// ---------------------------------------------------------------------------
// Recipe — replace these constants. Leave everything below this block as-is.
// ---------------------------------------------------------------------------

const LANGUAGE: Language = "en";
const NAME = "Shakshuka";
const SERVINGS: number = 2;

const INGREDIENTS: IngredientGroup[] = [
  {
    name: "Produce",
    items: [
      {
        id: "onion",
        amount: "1 medium (about 150 g)",
        name: "yellow onion",
      },
      {
        id: "pepper",
        amount: "1 (about 160 g)",
        name: "red bell pepper",
      },
      { id: "garlic", amount: "3 cloves", name: "garlic" },
      {
        id: "parsley",
        amount: "a small handful (about 5 g)",
        name: "flat-leaf parsley",
      },
    ],
  },
  {
    name: "Seasoning",
    items: [
      { id: "cumin", amount: "1 tsp (2 g)", name: "ground cumin" },
      { id: "paprika", amount: "1 tsp (2 g)", name: "smoked paprika" },
      { id: "cayenne", amount: "¼ tsp", name: "cayenne pepper" },
      { id: "salt", amount: "½ tsp (3 g)", name: "fine salt" },
      { id: "pepper-spice", amount: "a few grinds", name: "black pepper" },
    ],
  },
  {
    name: "Pantry",
    items: [
      {
        id: "oil",
        amount: "2 tbsp (30 ml)",
        name: "extra-virgin olive oil",
      },
      {
        id: "tomatoes",
        amount: "400 g (1 standard tin)",
        name: "chopped tomatoes",
      },
    ],
  },
  {
    name: "Protein",
    items: [{ id: "eggs", amount: "4 large", name: "eggs" }],
  },
];

const UTENSILS: Utensil[] = [
  { id: "skillet", name: "wide skillet with lid (about 26 cm)" },
  { id: "knife", name: "chef's knife" },
  { id: "board", name: "cutting board" },
  { id: "spoon", name: "wooden spoon" },
  { id: "measuring-spoons", name: "measuring spoons" },
  { id: "opener", name: "can opener" },
];

const NUTRIENTS: Nutrient[] = [
  { id: "energy", value: "1624 kJ / 388 kcal", intake: "19%" },
  { id: "fat", value: "26 g", intake: "37%" },
  { id: "saturates", value: "5.1 g", intake: "26%" },
  { id: "carbs", value: "21 g", intake: "8%" },
  { id: "sugars", value: "13 g", intake: "14%" },
  { id: "protein", value: "18 g", intake: "36%" },
  { id: "salt", value: "2.3 g", intake: "38%" },
];

const STEPS: Step[] = [
  {
    id: "warm-oil",
    title: "Warm the oil",
    start: 0,
    end: 3,
    instructions: [
      "Set a wide skillet over medium heat.",
      "Add the olive oil and let it shimmer.",
    ],
  },
  {
    id: "chop-veg",
    title: "Chop the vegetables",
    start: 0,
    end: 8,
    instructions: [
      "Dice the onion.",
      "Slice the pepper into short strips.",
      "Mince the garlic.",
    ],
  },
  {
    id: "soften-veg",
    title: "Soften onion and pepper",
    start: 8,
    end: 18,
    instructions: [
      "Add the onion and pepper to the skillet with a pinch of the salt.",
      "Cook, stirring now and then, until the onion is translucent and the pepper has softened.",
    ],
  },
  {
    id: "bloom-spices",
    title: "Bloom the spices",
    start: 18,
    end: 20,
    instructions: [
      "Stir in the garlic, cumin, paprika, and cayenne.",
      "Cook until fragrant, about a minute, so the spices do not stay raw.",
    ],
  },
  {
    id: "simmer-tomatoes",
    title: "Simmer the tomatoes",
    start: 20,
    end: 32,
    instructions: [
      "Pour in the tomatoes and the remaining salt.",
      "Crush any large pieces with the spoon.",
      "Let the sauce thicken until a spoon leaves a brief trail.",
    ],
  },
  {
    id: "chop-parsley",
    title: "Chop the parsley",
    start: 28,
    end: 32,
    instructions: [
      "While the sauce simmers, chop the parsley and set it aside for serving.",
    ],
  },
  {
    id: "cook-eggs",
    title: "Cook the eggs",
    start: 32,
    end: 40,
    instructions: [
      "Make four wells in the sauce with the back of a spoon.",
      "Crack an egg into each well.",
      "Cover the skillet and cook until the whites are set and the yolks are still runny, 6–8 minutes.",
    ],
  },
  {
    id: "rest-serve",
    title: "Rest and serve",
    start: 40,
    end: 42,
    instructions: [
      "Take the skillet off the heat and let it stand a minute.",
      "Grind over black pepper, scatter the parsley, and serve in the pan.",
    ],
  },
];

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

const COPY = {
  en: {
    ingredients: "Ingredients",
    utensils: "Utensils",
    steps: "Steps",
    nutrition: "Nutrition",
    typicalValues: "Typical values",
    perServing: "Per serving",
    referenceIntake: "Reference intake",
    timelineAria: "Cooking timeline in minutes from start",
    timelineSpot: (start: number, end: number) =>
      `${start}–${end} min from start`,
    nutrients: {
      energy: "Energy",
      fat: "Fat",
      saturates: "of which saturates",
      carbs: "Carbohydrate",
      sugars: "of which sugars",
      protein: "Protein",
      salt: "Salt",
    },
  },
  pl: {
    ingredients: "Składniki",
    utensils: "Przybory",
    steps: "Kroki",
    nutrition: "Wartości odżywcze",
    typicalValues: "Wartość odżywcza",
    perServing: "Na porcję",
    referenceIntake: "% RWS",
    timelineAria: "Oś czasu gotowania w minutach od początku",
    timelineSpot: (start: number, end: number) =>
      `${start}–${end} min od początku`,
    nutrients: {
      energy: "Energia",
      fat: "Tłuszcz",
      saturates: "w tym kwasy nasycone",
      carbs: "Węglowodany",
      sugars: "w tym cukry",
      protein: "Białko",
      salt: "Sól",
    },
  },
} as const;

const copy = COPY[LANGUAGE];
const NESTED_NUTRIENTS: NutrientId[] = ["saturates", "sugars"];

const ui = {
  paper: "#FFF3F6",
  grid: "#F4C4D4",
  outline: "#E89AB8",
  ink: "#C45A86",
  muted: "#D48AA8",
  cream: "#FFFBFC",
  mint: "#C8F0C4",
  pink: "#F7C2D8",
  blue: "#C5D4F6",
  yellow: "#F6D56A",
  mintDeep: "#8ECF8A",
  onBar: "#5A3D4A",
};

const PIXEL: CSSProperties = {
  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
  fontSize: 12,
  letterSpacing: 2,
  textTransform: "uppercase",
  fontWeight: 600,
  color: ui.ink,
};

const ingredientGroups = INGREDIENTS.filter((group) => group.items.length > 0);

function checkId(kind: "ingredient" | "utensil", id: string): string {
  return `${kind}:${id}`;
}

function servingsLabel(count: number): string {
  if (LANGUAGE === "en") {
    return count === 1 ? "1 serving" : `${count} servings`;
  }
  if (count === 1) return "1 porcja";
  const ones = count % 10;
  const tens = count % 100;
  if (ones >= 2 && ones <= 4 && (tens < 12 || tens > 14)) {
    return `${count} porcje`;
  }
  return `${count} porcji`;
}

function timelineSpot(step: Step): string {
  return copy.timelineSpot(step.start, step.end);
}

function tickEvery(total: number): number {
  if (total <= 20) return 5;
  if (total <= 60) return 10;
  if (total <= 120) return 20;
  if (total <= 240) return 30;
  return 60;
}

function Dots() {
  return (
    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
      {[ui.yellow, ui.mintDeep, ui.pink].map((fill) => (
        <div
          key={fill}
          style={{
            width: 10,
            height: 10,
            borderRadius: 99,
            background: fill,
            border: `1.5px solid ${ui.outline}`,
          }}
        />
      ))}
    </div>
  );
}

function Window({
  title,
  bar,
  children,
}: {
  title: string;
  bar: string;
  children: ReturnType<typeof Stack> | ReturnType<typeof NutritionTable>;
}) {
  return (
    <div
      style={{
        background: ui.cream,
        border: `2px solid ${ui.outline}`,
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: bar,
          borderBottom: `2px solid ${ui.outline}`,
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <span style={PIXEL}>{title}</span>
        <Dots />
      </div>
      <div style={{ padding: 16 }}>{children}</div>
    </div>
  );
}

function PaperGrid() {
  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      aria-hidden
    >
      <defs>
        <pattern
          id="sticker-grid"
          width="22"
          height="22"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 22 0 L 0 0 0 22"
            fill="none"
            stroke={ui.grid}
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#sticker-grid)" />
    </svg>
  );
}

function NutritionTable({ rows }: { rows: Nutrient[] }) {
  const cell = {
    padding: "8px 0",
    background: "transparent",
    borderBottom: `1px solid ${ui.grid}`,
    fontWeight: 400,
  } as const;

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ ...cell, textAlign: "left" }}>
            <Text size="small" style={{ color: ui.muted }}>
              {copy.typicalValues}
            </Text>
          </th>
          <th style={{ ...cell, textAlign: "right" }}>
            <Text size="small" style={{ color: ui.muted }}>
              {copy.perServing}
            </Text>
          </th>
          <th style={{ ...cell, textAlign: "right" }}>
            <Text size="small" style={{ color: ui.muted }}>
              {copy.referenceIntake}
            </Text>
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => {
          const line =
            i === rows.length - 1 ? { ...cell, borderBottom: "none" } : cell;
          const nested = NESTED_NUTRIENTS.includes(row.id);
          return (
            <tr key={`${row.id}-${i}`}>
              <td style={{ ...line, paddingLeft: nested ? 16 : 0 }}>
                <Text
                  tone={nested ? "secondary" : "primary"}
                  style={{ color: nested ? ui.muted : ui.onBar }}
                >
                  {copy.nutrients[row.id]}
                </Text>
              </td>
              <td style={{ ...line, textAlign: "right" }}>
                <Text style={{ color: ui.onBar }}>{row.value}</Text>
              </td>
              <td style={{ ...line, textAlign: "right" }}>
                <Text style={{ color: ui.onBar }}>{row.intake}</Text>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function Checklist({
  items,
  checked,
  onToggle,
}: {
  items: { id: string; label: string }[];
  checked: Record<string, boolean>;
  onToggle: (id: string, value: boolean) => void;
}) {
  return (
    <Stack gap={8}>
      {items.map((item) => {
        const on = Boolean(checked[item.id]);
        return (
          <div key={item.id}>
            <div
              onClick={() => onToggle(item.id, !on)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 4,
                  flexShrink: 0,
                  border: `2px solid ${ui.outline}`,
                  background: on ? ui.mint : ui.cream,
                }}
              />
              <Text style={{ color: ui.onBar }}>{item.label}</Text>
            </div>
          </div>
        );
      })}
    </Stack>
  );
}

function labelLayout(
  title: string,
  x1: number,
  x2: number,
  barW: number,
  plotLeft: number,
  plotRight: number,
) {
  const need = title.length * 6.6 + 16;
  if (barW >= need) {
    return { x: x1 + 8, anchor: "start" as const, inside: true };
  }
  const leftRoom = x1 - plotLeft;
  const rightRoom = plotRight - x2;
  if (rightRoom >= leftRoom) {
    return { x: x2 + 6, anchor: "start" as const, inside: false };
  }
  return { x: x1 - 6, anchor: "end" as const, inside: false };
}

function Timeline({
  steps,
  activeId,
  onSelect,
}: {
  steps: Step[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const origin = Math.min(...steps.map((entry) => entry.start));
  const total = Math.max(...steps.map((entry) => entry.end));
  const span = Math.max(total - origin, 1);
  const indexDigits = String(steps.length).length;
  const pad = { top: 8, right: 28, bottom: 32, left: 16 + indexDigits * 8 };
  const rowH = 28;
  const width = 720;
  const innerW = width - pad.left - pad.right;
  const height = pad.top + steps.length * rowH + pad.bottom;
  const x = (min: number) => pad.left + ((min - origin) / span) * innerW;
  const step = tickEvery(span);
  const ticks: number[] = [];
  for (let t = origin; t <= total; t += step) ticks.push(t);

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={copy.timelineAria}
    >
      {ticks.map((tick) => (
        <line
          key={tick}
          x1={x(tick)}
          x2={x(tick)}
          y1={pad.top}
          y2={height - pad.bottom}
          stroke={ui.grid}
          strokeWidth={1}
        />
      ))}
      {steps.map((entry, i) => {
        const y = pad.top + i * rowH;
        const x1 = x(entry.start);
        const x2 = x(entry.end);
        const barW = Math.max(x2 - x1, 4);
        const active = entry.id === activeId;
        const label = labelLayout(
          entry.title,
          x1,
          x2,
          barW,
          pad.left,
          width - pad.right,
        );
        return (
          <g
            key={entry.id}
            onClick={() => onSelect(entry.id)}
            style={{ cursor: "pointer" }}
          >
            <title>{`${i + 1}. ${entry.title}, ${timelineSpot(entry)}`}</title>
            <rect
              x={0}
              y={y}
              width={width}
              height={rowH}
              fill={active ? ui.pink : "transparent"}
            />
            <text
              x={pad.left - 8}
              y={y + rowH / 2 + 1}
              textAnchor="end"
              dominantBaseline="middle"
              fill={ui.muted}
              fontSize={11}
              fontFamily="ui-monospace, SF Mono, Menlo, monospace"
              fontVariantNumeric="tabular-nums"
            >
              {i + 1}
            </text>
            <rect
              x={x1}
              y={y + 6}
              width={barW}
              height={rowH - 12}
              rx={4}
              fill={active ? ui.pink : ui.mint}
              stroke={ui.outline}
              strokeWidth={1.5}
            />
            <text
              x={label.x}
              y={y + rowH / 2 + 1}
              textAnchor={label.anchor}
              dominantBaseline="middle"
              fill={label.inside ? ui.onBar : ui.ink}
              fontSize={11}
            >
              {entry.title}
            </text>
          </g>
        );
      })}
      {ticks.map((tick) => (
        <text
          key={`tick-${tick}`}
          x={x(tick)}
          y={height - 10}
          textAnchor="middle"
          fill={ui.muted}
          fontSize={11}
          fontFamily="ui-monospace, SF Mono, Menlo, monospace"
          fontVariantNumeric="tabular-nums"
        >
          {tick} min
        </text>
      ))}
    </svg>
  );
}

export default function Recipe() {
  const fallbackStep = STEPS[0]?.id ?? "";
  const [checked, setChecked] = useCanvasState<Record<string, boolean>>(
    "checked",
    {},
  );
  const [activeId, setActiveId] = useCanvasState("step", fallbackStep);
  const selectedId = STEPS.some((step) => step.id === activeId)
    ? activeId
    : fallbackStep;

  function toggle(id: string, value: boolean) {
    setChecked((prev) => ({ ...prev, [id]: value }));
  }

  const ingredients = ingredientGroups.length > 0 && (
    <Window title={copy.ingredients} bar={ui.pink}>
      <Stack gap={16}>
        {ingredientGroups.map((group, i) => (
          <div key={`${group.name}-${i}`}>
            <Stack gap={8}>
              <span style={{ ...PIXEL, fontSize: 11 }}>{group.name}</span>
              <Checklist
                items={group.items.map((item) => ({
                  id: checkId("ingredient", item.id),
                  label: `${item.amount} ${item.name}`,
                }))}
                checked={checked}
                onToggle={toggle}
              />
            </Stack>
          </div>
        ))}
      </Stack>
    </Window>
  );

  const utensils = UTENSILS.length > 0 && (
    <Window title={copy.utensils} bar={ui.blue}>
      <Stack gap={12}>
        <Checklist
          items={UTENSILS.map((item) => ({
            id: checkId("utensil", item.id),
            label: item.name,
          }))}
          checked={checked}
          onToggle={toggle}
        />
      </Stack>
    </Window>
  );

  return (
    <div
      style={{
        background: ui.paper,
        border: `3px solid ${ui.outline}`,
        borderRadius: 20,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          background: ui.paper,
          borderBottom: `2px solid ${ui.outline}`,
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Stack gap={2} style={{ minWidth: 0, flex: 1 }}>
          <H1
            style={{
              ...PIXEL,
              fontSize: 14,
              lineHeight: "18px",
              minWidth: 0,
            }}
          >
            {NAME}
          </H1>
          <Text size="small" style={{ color: ui.muted }}>
            {servingsLabel(SERVINGS)}
          </Text>
        </Stack>
        <Dots />
      </div>
      <div style={{ position: "relative", padding: 20 }}>
        <PaperGrid />
        <div style={{ position: "relative" }}>
          <Stack gap={20}>
            {NUTRIENTS.length > 0 && (
              <Window title={copy.nutrition} bar={ui.mint}>
                <NutritionTable rows={NUTRIENTS} />
              </Window>
            )}

            {ingredients && utensils ? (
              <Grid columns={2} gap={20} align="start">
                {ingredients}
                {utensils}
              </Grid>
            ) : (
              ingredients || utensils
            )}

            {STEPS.length > 0 && (
              <Window title={copy.steps} bar={ui.mint}>
                <Stack gap={16}>
                  <Timeline
                    steps={STEPS}
                    activeId={selectedId}
                    onSelect={setActiveId}
                  />
                  <Stack gap={12}>
                    {STEPS.map((step, i) => {
                      const active = step.id === selectedId;
                      return (
                        <div
                          key={step.id}
                          onClick={() => setActiveId(step.id)}
                          style={{
                            background: active ? ui.pink : ui.cream,
                            border: `2px solid ${ui.outline}`,
                            borderRadius: 12,
                            padding: 12,
                            cursor: "pointer",
                          }}
                        >
                          <Stack gap={8}>
                            <span style={{ ...PIXEL, fontSize: 11 }}>
                              {i + 1}. {step.title}
                            </span>
                            <Text size="small" style={{ color: ui.muted }}>
                              {timelineSpot(step)}
                            </Text>
                            <Stack gap={4}>
                              {step.instructions.map((line, j) => (
                                <div key={`${step.id}-${j}`}>
                                  <Text style={{ color: ui.onBar }}>
                                    · {line}
                                  </Text>
                                </div>
                              ))}
                            </Stack>
                          </Stack>
                        </div>
                      );
                    })}
                  </Stack>
                </Stack>
              </Window>
            )}
          </Stack>
        </div>
      </div>
    </div>
  );
}
