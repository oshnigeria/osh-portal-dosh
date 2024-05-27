/** @jsxImportSource @emotion/react */
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

const DeclarationPopup = (props) => {
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        css={{
          width: "70%",
        }}
      >
        <div
          css={(theme) => ({
            fontSize: 20,
            fontWeight: 700,
            color: theme.colors.Gray_600,
            textAlign: "center",
            // textTransform: "capitalize",
          })}
        >
          Would you like to proceed?
        </div>
        <div
          css={(theme) => ({
            marginTop: 24,
            fontSize: 16,
            textAlign: "center",
            color: theme.colors.Gray_700,
          })}
        >
          Please be aware that edits may not be possible after submission.
        </div>
        <div
          css={{
            display: "grid",
            gridTemplateColumns: `repeat(2, 1fr)`,
            rowGap: 48,
            columnGap: 50,
            alignItems: "center",
            marginTop: 54,
            width: "100%",
          }}
        >
          <div
            css={(theme) => ({
              fontSize: 16,
              fontWeight: 600,
              color: theme.colors.Error_600,
              textAlign: "center",
              cursor: "pointer",
            })}
            onClick={() => props.close()}
          >
            No, cancel
          </div>
          <div>
            <button
              css={(theme) => ({
                width: "100%",
                textAlign: "center",
                border: "none",
                outline: "none",
                fontSize: 16,

                fontWeight: 500,
                lineHeight: "26px",
                color: "#fff",
                letterSpacing: "0.3px",
                padding: "16px 16px",
                backgroundColor: theme.colors.Primary_500,
                textTransform: "capitalize",
                marginRight: 4,
                cursor: "pointer",
                "&:active": {
                  backgroundColor: theme.colors.Primary_800,
                },
                borderRadius: 30,
              })}
              onClick={() => props.ammend()}
            >
              Yes, continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeclarationPopup;
