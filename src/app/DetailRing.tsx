import { memo, useState, useRef, useCallback, useEffect, useMemo } from "react";

const glassBase = {
  background: "rgba(255,255,255,0.035)",
  backdropFilter: "blur(6px) saturate(1.15)",
  WebkitBackdropFilter: "blur(6px) saturate(1.15)",
  border: "1px solid rgba(255,255,255,0.06)",
  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.04), 0 8px 24px rgba(0,0,0,0.3)",
};

const glassActive = (color: string) => ({
  background: "rgba(255,255,255,0.07)",
  backdropFilter: "blur(8px) saturate(1.25)",
  WebkitBackdropFilter: "blur(8px) saturate(1.25)",
  border: `1px solid ${color}55`,
  boxShadow: `inset 0 0 8px ${color}10, 0 0 0 1px ${color}20`,
});

interface DetailRingProps {
  activeItem: any;
  activeColor: string;
  activeSrc: "right" | "left";
  rInnerIdx: number;
  lNav: number;
  LEFT_CONTENT: any[];
  LEFT_NAV: any[];
  RIGHT_INNER: any[];
  onPreview: (p: { img: string; idx: number }) => void;
}

type It = { id: string; h: number; node: React.ReactNode };

const C_TOP = 350;
const C_BOT = 1300;
const VISIBLE_H = C_BOT - C_TOP;
const ARC_R = 900;
const ARC_C = 900;
const PAD = 25;

const getArcX = (y: number) => {
  const dy = Math.max(-ARC_R, Math.min(ARC_R, y - ARC_C));
  const arcX = ARC_C - Math.sqrt(Math.max(0, ARC_R * ARC_R - dy * dy));
  return arcX + PAD;
};

const buildVisible = (
  source: It[],
  offsetX: number,
  parallax: number,
  itemW: number,
  detailScroll: number
) => {
  let acc = 0;
  const positioned = source.map((item) => {
    const top = acc;
    acc += item.h + 14;
    return { ...item, top };
  });
  const totalH = acc;

  const out: Array<{
    id: string;
    x: number;
    y: number;
    node: React.ReactNode;
    index: number;
    w: number;
  }> = [];
  if (totalH > 0) {
    positioned.forEach((item, index) => {
      if (totalH <= VISIBLE_H) {
        const y = item.top + C_TOP;
        if (y + item.h > C_TOP - 50 && y < C_BOT + 50) {
          out.push({
            id: item.id,
            x: getArcX(y + item.h / 2) + offsetX,
            y,
            node: item.node,
            index,
            w: itemW,
          });
        }
      } else {
        const scroll =
          totalH > 0
            ? (((detailScroll * parallax) % totalH) + totalH) % totalH
            : 0;
        const rawY = item.top - scroll + C_TOP;
        [-1, 0, 1].forEach((cycle) => {
          const y = rawY + cycle * totalH;
          if (y + item.h > C_TOP - 50 && y < C_BOT + 50) {
            out.push({
              id: `${item.id}--${cycle}`,
              x: getArcX(y + item.h / 2) + offsetX,
              y,
              node: item.node,
              index,
              w: itemW,
            });
          }
        });
      }
    });
  }
  return out;
};

const DetailRing = memo(function DetailRing({
  activeItem,
  activeColor,
  activeSrc,
  rInnerIdx,
  lNav,
  LEFT_CONTENT,
  LEFT_NAV,
  RIGHT_INNER,
  onPreview,
}: DetailRingProps) {
  const [detailScroll, setDetailScroll] = useState(0);
  const detailRaf = useRef<number>(0);
  const pendingDetailDelta = useRef(0);

  useEffect(() => {
    setDetailScroll(0);
  }, [activeItem?.id]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.stopPropagation();
    pendingDetailDelta.current += e.deltaY;
    if (detailRaf.current) return;
    detailRaf.current = requestAnimationFrame(() => {
      detailRaf.current = 0;
      const delta = pendingDetailDelta.current;
      pendingDetailDelta.current = 0;
      if (delta !== 0) setDetailScroll((prev) => prev + delta);
    });
  }, []);

  // 缓存内容构建：只在 activeItem 变化时重建 JSX
  const streamData = useMemo(() => {
    const items: It[] = [];

    items.push({
      id: "cat",
      h: 26,
      node: (
        <p
          className="tracking-widest uppercase"
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "0.6rem",
            color: activeColor,
            letterSpacing: "0.28em",
            transition: "color 0.8s ease",
          }}
        >
          {activeSrc === "right"
            ? RIGHT_INNER[rInnerIdx].label
            : LEFT_NAV[lNav].labelEn}
        </p>
      ),
    });

    items.push({
      id: "title",
      h: 38,
      node: (
        <h2
          className="leading-tight"
          style={{
            fontFamily: "Unbounded, sans-serif",
            fontSize: "1.8rem",
            fontWeight: 200,
            color: "rgba(255,255,255,0.95)",
            letterSpacing: "0.01em",
          }}
        >
          {activeItem.title}
        </h2>
      ),
    });

    if (activeItem.titleEn) {
      items.push({
        id: "titleEn",
        h: 26,
        node: (
          <p
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "0.62rem",
              color: "rgba(255,255,255,0.22)",
              letterSpacing: "0.14em",
            }}
          >
            {activeItem.titleEn}
          </p>
        ),
      });
    }

    if (activeItem.year || activeItem.category) {
      items.push({
        id: "meta",
        h: 30,
        node: (
          <p
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "0.6rem",
              color: "rgba(255,255,255,0.28)",
              letterSpacing: "0.14em",
            }}
          >
            {activeItem.year && `${activeItem.year}`}
            {activeItem.year && activeItem.category && " / "}
            {activeItem.category}
          </p>
        ),
      });
    }

    if (activeItem.video) {
      items.push({
        id: "video",
        h: 120,
        node: (
          <button
            onClick={() => onPreview({ img: activeItem.video, idx: -1 })}
            style={{
              width: "100%",
              height: 110,
              borderRadius: 8,
              overflow: "hidden",
              border: "none",
              background: "rgba(255,255,255,0.04)",
              cursor: "pointer",
              padding: 0,
              position: "relative",
            }}
          >
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.3)" }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white" opacity="0.85">
                <polygon points="8,5 19,12 8,19" />
              </svg>
            </div>
            <span
              style={{
                position: "absolute",
                bottom: 8,
                left: 10,
                fontFamily: "DM Mono, monospace",
                fontSize: "0.6rem",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              点击播放视频
            </span>
          </button>
        ),
      });
    }

    if (activeItem.images && activeItem.images.length > 0) {
      const IMAGES_PER_ROW = 3;
      const totalRows = Math.ceil(activeItem.images.length / IMAGES_PER_ROW);
      for (let r = 0; r < totalRows; r++) {
        const isLargeRow = r % 2 === 0;
        const rowImages = activeItem.images.slice(
          r * IMAGES_PER_ROW,
          (r + 1) * IMAGES_PER_ROW
        );
        const gap = isLargeRow ? 10 : 8;
        const mb = isLargeRow ? 10 : 8;

        const dims = rowImages.map((img: string) => {
          if (img.includes("长图")) {
            return { w: isLargeRow ? 26 : 20, h: isLargeRow ? 78 : 60 };
          }
          return { w: isLargeRow ? 82 : 64, h: isLargeRow ? 58 : 46 };
        });
        const maxH = Math.max(...dims.map((d) => d.h));

        items.push({
          id: `img-${r}`,
          h: maxH + mb,
          node: (
            <div className="flex items-end" style={{ gap, marginBottom: mb }}>
              {rowImages.map((img: string, c: number) => {
                const d = dims[c];
                return (
                  <button
                    key={c}
                    onClick={() =>
                      onPreview({ img, idx: r * IMAGES_PER_ROW + c })
                    }
                    style={{
                      width: d.w,
                      height: d.h,
                      borderRadius: 5,
                      overflow: "hidden",
                      border: "none",
                      background: "rgba(255,255,255,0.03)",
                      cursor: "pointer",
                      padding: 0,
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={img}
                      alt={`${activeItem.title} ${r * IMAGES_PER_ROW + c + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                );
              })}
            </div>
          ),
        });
      }
    }

    const text = activeItem.detail || "";
    const maxLen = 20;
    const lines: string[] = [];
    let i = 0;
    while (i < text.length) {
      let end = Math.min(i + maxLen, text.length);
      if (end < text.length) {
        let breakAt = end;
        while (breakAt > i && text[breakAt] !== "，" && text[breakAt] !== "。" && text[breakAt] !== " " && text[breakAt] !== "、") breakAt--;
        if (breakAt > i) end = breakAt + 1;
      }
      lines.push(text.slice(i, end));
      i = end;
    }
    lines.forEach((line, idx) => {
      items.push({
        id: `txt-${idx}`,
        h: 26,
        node: (
          <p
            className="leading-relaxed"
            style={{
              fontFamily: "Crimson Pro, serif",
              fontSize: "0.9rem",
              lineHeight: 1.85,
              color: "rgba(255,255,255,0.38)",
              fontWeight: 300,
              letterSpacing: "0.01em",
            }}
          >
            {line}
          </p>
        ),
      });
    });

    if (activeSrc === "left" && lNav === 1) {
      items.push({
        id: "links",
        h: 80,
        node: (
          <div className="flex flex-wrap gap-2">
            {LEFT_CONTENT[1].map((c: any) => (
              <a
                key={c.id}
                href={c.detail === "#" ? undefined : c.detail}
                className="flex items-center gap-2 px-3 py-2 transition-all duration-300"
                style={{
                  borderRadius: 12,
                  ...glassActive(activeColor),
                  fontFamily: "DM Mono, monospace",
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.85)",
                  letterSpacing: "0.04em",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "scale(1.04)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "scale(1)";
                }}
              >
                <c.icon size={12} style={{ color: activeColor }} />
                {c.detail === "#" ? c.title : c.detail}
              </a>
            ))}
          </div>
        ),
      });
    }

    return items;
  }, [activeItem, activeColor, activeSrc, rInnerIdx, lNav, LEFT_CONTENT, LEFT_NAV, RIGHT_INNER, onPreview]);

  // 缓存渲染结果：detailScroll 变化时只重算位置，不重建 JSX
  const renderedItems = useMemo(() => {
    const visible = buildVisible(streamData, 40, 1.0, 280, detailScroll);

    return visible.map((item) => (
      <div
        key={item.id}
        className="absolute"
        style={{
          left: item.x,
          top: item.y,
          width: item.w,
          opacity: 1,
        }}
      >
        {item.node}
      </div>
    ));
  }, [streamData, detailScroll]);

  return (
    <div
      className="absolute"
      style={{
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: 1800,
        height: 1800,
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      {/* 240° 环形扇区背景 */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
        viewBox="-900 -900 1800 1800"
      >
        <path
          d="M 43.6 498.1 A 500 500 0 1 1 409.6 -286.8 L 737.3 -516.2 A 900 900 0 1 0 78.5 896.6 Z"
          fill="rgba(255,255,255,0.025)"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
        <line
          x1="43.6"
          y1="498.1"
          x2="78.5"
          y2="896.6"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />
        <line
          x1="409.6"
          y1="-286.8"
          x2="737.3"
          y2="-516.2"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />
      </svg>

      {/* HTML 内容区 */}
      <div
        className="absolute hide-scrollbar"
        style={{
          inset: 0,
          overflow: "hidden",
          pointerEvents: "auto",
          clipPath:
            "path('M 943.6 1398.1 A 500 500 0 1 1 1309.6 613.2 L 1637.3 383.8 A 900 900 0 1 0 978.5 1796.6 Z')",
        }}
        onWheel={handleWheel}
      >
        {renderedItems}
      </div>
    </div>
  );
});

export default DetailRing;
