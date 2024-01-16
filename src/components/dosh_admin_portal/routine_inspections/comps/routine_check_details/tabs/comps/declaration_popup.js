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
            color: theme.colors.Gray_700,
            textAlign: "center",
          })}
        >
          Declaration
        </div>
        <div
          css={(theme) => ({
            marginTop: 24,
            fontSize: 16,
            textAlign: "center",
            color: theme.colors.Gray_700,
          })}
        >
          Lorem ipsum dolor sit amet consectetur. Augue tempus nulla id erat.
          Quisque tincidunt ut in dignissim vel egestas. Sed ut quisque rutrum
          semper vulputate et volutpat mor
        </div>
        <div
          css={{
            display: "grid",
            gridTemplateColumns: `repeat(2, 1fr)`,
            rowGap: 48,
            columnGap: 50,
            alignItems: "center",
            marginTop: 54,
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
