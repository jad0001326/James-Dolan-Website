export function OgCard() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#10140f",
        color: "#eef2e6",
      }}
    >
      <div style={{ width: 18, background: "#d6f25c" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 3, color: "#e4c27a" }}>JAMESDOLAN.INFO</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 1 }}>James Dolan</div>
          <div style={{ marginTop: 16, fontSize: 36, color: "#d6f25c" }}>SOAR Engineer</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#c5cebb" }}>
          Automation-first incident response · Falkirk area, Scotland
        </div>
      </div>
    </div>
  );
}
