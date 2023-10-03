/** @jsxImportSource @emotion/react */

import toast, { Toaster } from "react-hot-toast";

export const success_message = (message) =>
  toast.custom((t) => (
    <div
      css={(theme) => ({
        padding: "8px 12px",

        backgroundColor: theme.colors.Success_100,
        boxShadow: "1px 2px 40px 5px rgba(0, 0, 0, 0.02)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "8px",
      })}
    >
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <img
            css={{
              marginRight: 12,
            }}
            src="/svg/toast/success.svg"
          />
        </div>
        <div
          css={(theme) => ({
            color: theme.colors.Secondary1,
            fontSize: [18, 35, 14],
            fontWeight: 400,
            lineHeight: ["26px", "28px", "26px"],
          })}
        >
          {message}.
        </div>
      </div>
    </div>
  ));

export const error_message = (message) =>
  toast.custom((t) => (
    <div
      css={(theme) => ({
        padding: "8px 12px",

        backgroundColor: theme.colors.Error_100,
        boxShadow: "1px 2px 40px 5px rgba(0, 0, 0, 0.02)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "8px",
      })}
    >
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <img
            css={{
              marginRight: 12,
            }}
            src="/svg/toast/error.svg"
          />
        </div>
        <div
          css={(theme) => ({
            color: theme.colors.Secondary1,
            fontSize: [18, 35, 14],
            fontWeight: 400,
            lineHeight: ["26px", "28px", "26px"],
          })}
        >
          {message}
        </div>
      </div>
    </div>
  ));
