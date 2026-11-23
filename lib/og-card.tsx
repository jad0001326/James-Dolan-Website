export function OgCard() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#050706",
        color: "#e7f6e4",
      }}
    >
      <div style={{ width: 12, background: "#b6ff6a" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, color: "#8ef6ff" }}>james@soc:~$ whoami</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, lineHeight: 1 }}>James Dolan</div>
          <div style={{ marginTop: 18, fontSize: 34, color: "#b6ff6a" }}>SOAR Engineer</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#b7c8b6" }}>
          incident response automation · Falkirk area, Scotland
        </div>
      </div>
    </div>
  );
}
