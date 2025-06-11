/* eslint-disable @typescript-eslint/no-unused-vars */
import ReactMarkdown from "react-markdown";

const MarkDown = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => (
          <h1
            style={{
              fontSize: "2rem",
              marginTop: "1.5rem",
              marginBottom: "0.75rem",
            }}
            {...props}
          />
        ),
        h2: ({ node, ...props }) => (
          <h2
            style={{
              fontSize: "1.75rem",
              marginTop: "1.25rem",
              marginBottom: "0.6rem",
            }}
            {...props}
          />
        ),
        h3: ({ node, ...props }) => (
          <h3
            style={{
              fontSize: "1.5rem",
              marginTop: "1rem",
              marginBottom: "0.5rem",
            }}
            {...props}
          />
        ),
        h4: ({ node, ...props }) => (
          <h4
            style={{
              fontSize: "1.25rem",
              marginTop: "0.75rem",
              marginBottom: "0.5rem",
            }}
            {...props}
          />
        ),
        p: ({ node, ...props }) => (
          <p style={{ lineHeight: 1.6, marginBottom: "1rem" }} {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul
            style={{
              listStyleType: "disc",
              paddingLeft: "1.5rem",
              marginBottom: "1rem",
            }}
            {...props}
          />
        ),
        ol: ({ node, ...props }) => (
          <ol
            style={{
              listStyleType: "decimal",
              paddingLeft: "1.5rem",
              marginBottom: "1rem",
            }}
            {...props}
          />
        ),
        li: ({ node, ...props }) => (
          <li style={{ marginBottom: "0.25rem" }} {...props} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote
            style={{
              borderLeft: "4px solid #ddd",
              marginLeft: 0,
              paddingLeft: "1rem",
              color: "#666",
              fontStyle: "italic",
              marginBottom: "1rem",
              backgroundColor: "#f9f9f9",
              borderRadius: "4px",
            }}
            {...props}
          />
        ),
        code: ({ node, className, children, ...props }) => {
          const style = {
            backgroundColor: "#272822",
            color: "#f8f8f2",
            padding: "1em",
            borderRadius: "5px",
            fontFamily: "monospace",
            fontSize: "0.9em",
            display: "block",
            overflowX: "auto" as React.CSSProperties["overflowX"],
            marginBottom: "1rem",
          };

          return (
            <code className={className} style={style} {...props}>
              {children}
            </code>
          );
        },
        img: ({ node, ...props }) => (
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <img
              {...props}
              style={{
                maxWidth: "70%",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "fallback-image-url.jpg";
                e.currentTarget.alt = "Failed to load image";
              }}
            />
          </div>
        ),
        a: ({ node, children, href, ...props }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#0066cc",
              textDecoration: "none",
              borderBottom: "1px solid transparent",
              transition: "border-bottom-color 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.borderBottomColor = "#0066cc")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.borderBottomColor = "transparent")
            }
            {...props}
          >
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkDown;
