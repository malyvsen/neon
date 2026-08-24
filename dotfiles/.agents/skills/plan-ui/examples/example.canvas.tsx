/**
 * Ridge, a field book you take to the yard.
 *
 * Copy this file and edit it in place. Pixel8Pro and Desktop take children only.
 *
 * PAGES holds switcher labels, the point of each screen, and device captions.
 * A page may list variants: other presentations of the same screen, each with
 * a one-sentence tradeoff. Extra tabs appear for any page that has them.
 *
 * Add a screen by appending a page and a function, then branching in Screen.
 */
import {
  H1,
  Stack,
  Text,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";

const PAPER = "#f7f4ef";
const INK = "#1d1b20";
const MUTED = "#5c584f";
const LINE = "#d8d0c4";
const CHIP = "#ebe4d8";
const PHONE_W = 312;
const PHONE_H = 694;
const DESKTOP_W = 320;

const FIELDS = [
  { name: "Home paddock", acres: "12 ac", crop: "Wheat", stage: "Heading" },
  { name: "North twenty", acres: "20 ac", crop: "Barley", stage: "Tillering" },
  { name: "Bottom creek", acres: "8 ac", crop: "Lucerne", stage: "After cut" },
];

const JOBS = [
  { when: "6:30", field: "Home paddock", job: "Walk the headlands for rust" },
  { when: "9:00", field: "North twenty", job: "Roll the east strip" },
  { when: "14:00", field: "Bottom creek", job: "Move the bales off the creek flat" },
];

type Variant = {
  id: string;
  label: string;
  tradeoff: string;
  mobile: string;
  desktop: string;
};

type Page = {
  id: string;
  label: string;
  note: string;
  mobile?: string;
  desktop?: string;
  variants?: Variant[];
};

const PAGES: Page[] = [
  {
    id: "fields",
    label: "Field list",
    note: "This is where you see every paddock and decide which one to walk.",
    mobile:
      "Each paddock is a row with the name on top and acres, crop, and stage on the line below.",
    desktop:
      "The same two-line rows, with the extra width going to the name and the line under it.",
  },
  {
    id: "plot",
    label: "Single field",
    note: "This is where you check one paddock before you start work on it.",
    mobile:
      "A note on the paddock comes first, and the next job sits on a card below it.",
    desktop:
      "The same note and next job sit in a wider column.",
  },
  {
    id: "today",
    label: "Day's work",
    note: "This is where you see what still needs doing today.",
    variants: [
      {
        id: "list",
        label: "List",
        tradeoff:
          "The whole day fits in a tight column, though the rows are thin to tap.",
        mobile:
          "Each job is a row with the time pinned left and the field name under the job.",
        desktop:
          "The same rows give the job title the extra width, and keep the field name quiet underneath.",
      },
      {
        id: "cards",
        label: "Cards",
        tradeoff: "Each job is its own padded block, so one is easier to pick.",
        mobile:
          "Each job is a padded card with the time and field above the job title.",
        desktop:
          "The cards stay stacked; only the padding tightens on the wider pane.",
      },
      {
        id: "half-day",
        label: "By half-day",
        tradeoff:
          "Afternoon is labeled as its own group, so you know whether you still have to go back out after lunch.",
        mobile:
          "Morning and afternoon are labeled groups of the same job rows.",
        desktop:
          "The same morning and afternoon groups sit in a wider pane.",
      },
    ],
  },
  {
    id: "log",
    label: "Log a pass",
    note: "This is where a finished job gets written down before the next one starts.",
    mobile:
      "The fields stack in one column, and Save is a short button under the last field.",
    desktop:
      "The same stacked fields, with Save a little shorter.",
  },
];

function Pixel8Pro({ children }: { children?: object }) {
  return (
    <div
      style={{
        width: PHONE_W,
        flex: "none",
        padding: 7,
        borderRadius: 36,
        background: "#1c1b19",
        overflow: "hidden",
        boxSizing: "border-box",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          height: PHONE_H,
          borderRadius: 30,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          background: PAPER,
          color: INK,
        }}
      >
        <div
          style={{
            position: "relative",
            height: 32,
            display: "flex",
            alignItems: "center",
            padding: "0 22px",
            fontSize: 12,
            fontWeight: 600,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <span>11:32</span>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 10,
              width: 12,
              height: 12,
              marginLeft: -6,
              borderRadius: 99,
              background: "#0a0908",
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 0,
            minHeight: 0,
            overflow: "auto",
            padding: "8px 20px 12px",
          }}
        >
          {children}
        </div>
        <div
          style={{
            height: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 96,
              height: 4,
              borderRadius: 99,
              background: INK,
              opacity: 0.35,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Desktop({ children }: { children?: object }) {
  return (
    <div
      style={{
        width: DESKTOP_W,
        flex: "none",
        overflow: "hidden",
        border: `1px solid ${LINE}`,
        borderRadius: 10,
        background: PAPER,
        color: INK,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ padding: 16 }}>{children}</div>
    </div>
  );
}

function Pair({
  label,
  caption,
  children,
}: {
  label: string;
  caption: string;
  children?: object;
}) {
  const theme = useHostTheme();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        flex: "none",
      }}
    >
      <div>
        <Text weight="semibold">{label}</Text>
        <Text size="small" tone="secondary" style={{ maxWidth: DESKTOP_W }}>
          {caption}
        </Text>
      </div>
      <div
        style={{
          padding: "20px 16px",
          width: "fit-content",
          borderRadius: 8,
          background: theme.fill.tertiary,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Tabs({
  items,
  value,
  onPick,
}: {
  items: { id: string; label: string }[];
  value: string;
  onPick: (id: string) => void;
}) {
  const theme = useHostTheme();
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {items.map((item) => {
        const on = item.id === value;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onPick(item.id)}
            style={{
              padding: "6px 10px",
              border: `1px solid ${on ? theme.text.primary : theme.stroke.primary}`,
              borderRadius: 6,
              background: "transparent",
              color: on ? theme.text.primary : theme.text.secondary,
              fontFamily: "system-ui, sans-serif",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

function ScreenTitle({
  kicker,
  title,
  touch,
}: {
  kicker?: string;
  title: string;
  touch: boolean;
}) {
  return (
    <div style={{ marginBottom: touch ? 20 : 16 }}>
      {kicker ? (
        <div style={{ marginBottom: 6, fontSize: 13, color: MUTED }}>{kicker}</div>
      ) : null}
      <div
        style={{
          fontSize: touch ? 22 : 20,
          fontWeight: 600,
          letterSpacing: -0.3,
        }}
      >
        {title}
      </div>
    </div>
  );
}

function Fields({ touch }: { touch: boolean }) {
  return (
    <div>
      <ScreenTitle title="Fields" touch={touch} />
      {FIELDS.map((field) => (
        <div
          key={field.name}
          style={{
            marginBottom: 8,
            padding: touch ? "14px 16px" : "12px 14px",
            borderRadius: 8,
            background: CHIP,
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 500 }}>{field.name}</div>
          <div style={{ marginTop: 2, fontSize: 13, color: MUTED }}>
            {field.acres} · {field.crop} · {field.stage}
          </div>
        </div>
      ))}
    </div>
  );
}

function SingleField({ touch }: { touch: boolean }) {
  return (
    <div>
      <ScreenTitle kicker="Fields" title="North twenty" touch={touch} />
      <div style={{ fontSize: 15, lineHeight: 1.45, marginBottom: 16 }}>
        20 ac of barley, tillering. Rolled the east strip on 18 August. Soil is
        still holding, so spray only if rust shows on the headlands.
      </div>
      <div style={{ fontSize: 13, color: MUTED, marginBottom: 6 }}>Next</div>
      <div
        style={{
          padding: touch ? "14px 16px" : "12px 14px",
          borderRadius: 8,
          background: CHIP,
          fontSize: 15,
        }}
      >
        Walk the east strip after lunch
      </div>
    </div>
  );
}

function Today({ touch, variant }: { touch: boolean; variant: string }) {
  if (variant === "cards") {
    return (
      <div>
        <ScreenTitle kicker="Saturday, 24 August" title="Today" touch={touch} />
        {JOBS.map((row) => (
          <div
            key={row.job}
            style={{
              marginBottom: 8,
              padding: touch ? "14px 16px" : "12px 14px",
              borderRadius: 8,
              background: CHIP,
            }}
          >
            <div style={{ fontSize: 12, color: MUTED, fontVariantNumeric: "tabular-nums" }}>
              {row.when} · {row.field}
            </div>
            <div style={{ marginTop: 4, fontSize: 15, fontWeight: 500 }}>{row.job}</div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "half-day") {
    const morning = JOBS.filter((row) => Number(row.when.split(":")[0]) < 12);
    const afternoon = JOBS.filter((row) => Number(row.when.split(":")[0]) >= 12);
    return (
      <div>
        <ScreenTitle kicker="Saturday, 24 August" title="Today" touch={touch} />
        <div style={{ marginBottom: 6, fontSize: 13, color: MUTED }}>Morning</div>
        {morning.map((row) => (
          <JobLine key={row.job} row={row} touch={touch} />
        ))}
        <div style={{ margin: "16px 0 6px", fontSize: 13, color: MUTED }}>
          Afternoon
        </div>
        {afternoon.map((row) => (
          <JobLine key={row.job} row={row} touch={touch} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <ScreenTitle kicker="Saturday, 24 August" title="Today" touch={touch} />
      {JOBS.map((row) => (
        <JobLine key={row.job} row={row} touch={touch} />
      ))}
    </div>
  );
}

function JobLine({
  row,
  touch,
}: {
  row: (typeof JOBS)[number];
  touch: boolean;
  key?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        padding: touch ? "10px 0" : "8px 0",
        borderBottom: `1px solid ${LINE}`,
      }}
    >
      <div
        style={{
          width: 44,
          flex: "none",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
          color: MUTED,
        }}
      >
        {row.when}
      </div>
      <div>
        <div style={{ fontSize: 15 }}>{row.job}</div>
        <div style={{ marginTop: 2, fontSize: 12, color: MUTED }}>{row.field}</div>
      </div>
    </div>
  );
}

function Log({ touch }: { touch: boolean }) {
  return (
    <div>
      <ScreenTitle title="Log a pass" touch={touch} />
      <Input label="Field">North twenty</Input>
      <Input label="Done">Rolled the east strip</Input>
      <Input label="Notes">No rust on the headlands. Dew off by nine.</Input>
      <button
        type="button"
        style={{
          marginTop: 8,
          minHeight: touch ? 48 : 40,
          padding: "0 14px",
          border: `1px solid ${INK}`,
          borderRadius: 6,
          background: INK,
          color: PAPER,
          fontFamily: "inherit",
          fontSize: 15,
        }}
      >
        Save
      </button>
    </div>
  );
}

function Input({ label, children }: { label: string; children: string }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ marginBottom: 6, fontSize: 13, color: MUTED }}>{label}</div>
      <div
        style={{
          minHeight: 40,
          padding: "10px 12px",
          border: `1px solid ${LINE}`,
          borderRadius: 6,
          fontSize: 15,
          boxSizing: "border-box",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Screen({
  page,
  variant,
  touch,
}: {
  page: string;
  variant: string;
  touch: boolean;
}) {
  if (page === "plot") return <SingleField touch={touch} />;
  if (page === "today") return <Today touch={touch} variant={variant} />;
  if (page === "log") return <Log touch={touch} />;
  return <Fields touch={touch} />;
}

export default function Canvas() {
  const [pageId, setPageId] = useCanvasState("page", "fields");
  const [variantId, setVariantId] = useCanvasState("variant", "list");
  const page = PAGES.find((row) => row.id === pageId) ?? PAGES[0];
  const variant =
    page.variants?.find((row) => row.id === variantId) ?? page.variants?.[0];
  const mobileCaption = variant?.mobile ?? page.mobile ?? "";
  const desktopCaption = variant?.desktop ?? page.desktop ?? "";

  return (
    <Stack gap={28} style={{ padding: 24, boxSizing: "border-box" }}>
      <Stack gap={8}>
        <H1>Ridge - a field book you take to the yard</H1>
        <Text tone="secondary">
          An app for the farmer who knows every paddock by name and wants to
          write down each job while it is still in their head.
        </Text>
      </Stack>

      <Stack gap={8}>
        <Tabs items={PAGES} value={page.id} onPick={setPageId} />
        <Text size="small" tone="secondary">
          {page.note}
        </Text>
        {page.variants && variant ? (
          <Stack gap={8}>
            <Tabs
              items={page.variants}
              value={variant.id}
              onPick={setVariantId}
            />
            <Text size="small" tone="secondary">
              {variant.tradeoff}
            </Text>
          </Stack>
        ) : null}
      </Stack>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 28,
          alignItems: "flex-start",
        }}
      >
        <Pair label="Mobile" caption={mobileCaption}>
          <Pixel8Pro>
            <Screen page={page.id} variant={variant?.id ?? ""} touch />
          </Pixel8Pro>
        </Pair>
        <Pair label="Desktop" caption={desktopCaption}>
          <Desktop>
            <Screen page={page.id} variant={variant?.id ?? ""} touch={false} />
          </Desktop>
        </Pair>
      </div>
    </Stack>
  );
}
