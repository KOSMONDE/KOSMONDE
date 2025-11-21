import * as React from "react";

type KosmondeContactEmailProps = {
  name: string;
  email: string;
  projectType?: string;
  message: string;
  receivedAt?: Date;
};

export function KosmondeContactEmail({
  name,
  email,
  projectType,
  message,
  receivedAt,
}: KosmondeContactEmailProps) {
  const dateLabel = receivedAt
    ? receivedAt.toLocaleString("fr-CH")
    : new Date().toLocaleString("fr-CH");

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
                  margin: "0 0 4px 0",
                }}
              >
                Nouveau message depuis le site KOSMONDE
              </h1>

              <p
                style={{
                  fontSize: "13px",
                  color: "#94a3b8",
                  margin: "0 0 20px 0",
                }}
              >
                Vous avez reçu un nouveau message via le formulaire de contact.
              </p>

              {/* Infos principales */}
              <table
                width="100%"
                cellPadding={0}
                cellSpacing={0}
                style={{
                  borderCollapse: "separate",
                  borderSpacing: 0,
                  borderRadius: "18px",
                  border: "1px solid #1f2937",
                  backgroundColor: "#020617",
                  marginBottom: "16px",
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        padding: "14px 16px",
                        borderBottom: "1px solid #1f2937",
                        fontSize: "13px",
                        color: "#e5e7eb",
                      }}
                    >
                      <strong>Nom :</strong> {name}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{
                        padding: "14px 16px",
                        borderBottom: "1px solid #1f2937",
                        fontSize: "13px",
                        color: "#e5e7eb",
                      }}
                    >
                      <strong>Email :</strong>{" "}
                      <a
                        href={`mailto:${email}`}
                        style={{ color: "#38bdf8", textDecoration: "none" }}
                      >
                        {email}
                      </a>
                    </td>
                  </tr>

                  {projectType && (
                    <tr>
                      <td
                        style={{
                          padding: "14px 16px",
                          fontSize: "13px",
                          color: "#e5e7eb",
                        }}
                      >
                        <strong>Type de projet :</strong> {projectType}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Message */}
              <div
                style={{
                  borderRadius: "18px",
                  border: "1px solid #1f2937",
                  backgroundColor: "#020617",
                  padding: "14px 16px 18px 16px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    color: "#9ca3af",
                    marginBottom: "8px",
                  }}
                >
                  Message :
                </div>

                <div
                  style={{
                    fontSize: "13px",
                    color: "#e5e7eb",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {message}
                </div>
              </div>

              {/* Meta */}
              <p
                style={{
                  fontSize: "11px",
                  color: "#6b7280",
                  margin: "0 0 6px 0",
                }}
              >
                Reçu le : {dateLabel}
              </p>

              <p
                style={{
                  fontSize: "11px",
                  color: "#6b7280",
                  margin: 0,
                }}
              >
                Ce message a été envoyé depuis le formulaire de contact de{" "}
                <a
                  href="https://www.kosmonde.ch"
                  style={{ color: "#38bdf8", textDecoration: "none" }}
                >
                  kosmonde.ch
                </a>
                .
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
