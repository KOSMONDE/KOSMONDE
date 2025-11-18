import * as React from "react";

type KosmondeContactReplyEmailProps = {
  name: string;
  projectType?: string; // peut être optionnel
};

export function KosmondeContactReplyEmail({
  name,
  projectType,
}: KosmondeContactReplyEmailProps) {
  const firstName = (name || "").trim().split(" ")[0] || "Bonjour";
  const normalizedProjectType =
    projectType && projectType.trim().length > 0
      ? projectType.trim().toLowerCase()
      : "web";

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        backgroundColor: "#020617",
        color: "#e2e8f0",
        padding: "32px 0",
      }}
    >
      <table
        width="100%"
        cellPadding={0}
        cellSpacing={0}
        style={{ maxWidth: 640, margin: "0 auto" }}
      >
        <tbody>
          <tr>
            <td
              style={{
                fontSize: "11px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#38bdf8",
                paddingBottom: "16px",
              }}
            >
              KOSMONDE
            </td>
          </tr>

          <tr>
            <td
              style={{
                backgroundColor: "#020617",
                borderRadius: "24px",
                border: "1px solid #0f172a",
                boxShadow: "0 24px 80px rgba(15,23,42,0.9)",
                padding: "24px 24px 28px 24px",
              }}
            >
              <h1
                style={{
                  fontSize: "20px",
                  color: "#f9fafb",
                  margin: "0 0 8px 0",
                }}
              >
                Merci pour ton message
              </h1>

              <p
                style={{
                  fontSize: "13px",
                  color: "#cbd5f5",
                  margin: "0 0 16px 0",
                }}
              >
                {firstName},{" "}
                merci d&apos;avoir pris le temps de m&apos;écrire à propos de
                ton projet{" "}
                {normalizedProjectType === "web"
                  ? "web"
                  : `de type ${normalizedProjectType}`}
                .
              </p>

              <p
                style={{
                  fontSize: "13px",
                  color: "#94a3b8",
                  margin: "0 0 16px 0",
                }}
              >
                Je lis chaque message avec attention et je reviens vers toi
                rapidement pour te proposer une façon simple d&apos;avancer,
                même si tu pars de zéro.
              </p>

              <p
                style={{
                  fontSize: "13px",
                  color: "#94a3b8",
                  margin: "0 0 20px 0",
                }}
              >
                En attendant, tu peux revoir quelques exemples de sites sur{" "}
                <a
                  href="https://www.kosmonde.ch/#projets"
                  style={{ color: "#38bdf8", textDecoration: "none" }}
                >
                  kosmonde.ch/projets
                </a>
                .
              </p>

              <p
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  margin: 0,
                }}
              >
                À bientôt,
                <br />
                Yanis – KOSMONDE
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
