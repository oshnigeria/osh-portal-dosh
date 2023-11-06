/** @jsxImportSource @emotion/react */
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import facepaint from "facepaint";

const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
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
          css={(theme) =>
            mq({
              fontSize: [16, 16, 20],
              fontWeight: 700,
              color: theme.colors.Gray_700,
              textAlign: "center",
            })
          }
        >
          Are you sure you want to submit
        </div>
        <div
          css={(theme) =>
            mq({
              marginTop: 24,
              fontSize: [14, 14, 16],
              textAlign: "center",
              color: theme.colors.Gray_700,
            })
          }
        >
          Once you’ve submitted, your amendment will be processed and your will
          be notified for inspection
        </div>
        <div
          css={{
            display: "flex",
            justifyContent: "center",
            marginTop: 54,
          }}
        >
          <button
            css={(theme) =>
              mq({
                width: [140, 140, 356],
                textAlign: "center",
                border: "none",
                outline: "none",
                fontSize: [12, 12, 16],

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
              })
            }
            onClick={() => props.ammend()}
          >
            {props.loading ? (
              <div
                css={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {" "}
                <div
                  css={{
                    width: 24,
                    height: 24,
                  }}
                >
                  <img src="/svg/loader/loader.svg" />
                </div>
              </div>
            ) : (
              <div>Yes, continue</div>
            )}
          </button>
        </div>

        <div
          css={(theme) => ({
            fontSize: 16,
            fontWeight: 600,
            color: theme.colors.Error_600,
            textAlign: "center",
            marginTop: 36,
            cursor: "pointer",
          })}
          onClick={() => props.close()}
        >
          No, cancel
        </div>
      </div>
    </div>
  );
};

export default DeclarationPopup;
