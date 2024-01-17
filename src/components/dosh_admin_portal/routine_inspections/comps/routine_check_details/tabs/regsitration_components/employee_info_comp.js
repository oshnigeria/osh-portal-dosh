/** @jsxImportSource @emotion/react */
import facepaint from "facepaint";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const EmployeeInfoComp = (props) => {
  return (
    <div>
      <div
        css={mq({
          display: "grid",
          gridTemplateColumns: [
            `repeat(1, 1fr)`,
            `repeat(1, 1fr)`,
            `repeat(2, 1fr)`,
          ],
          rowGap: 48,
          columnGap: 50,
          marginTop: 24,
        })}
      >
        <div>
          <div
            css={{
              display: "grid",
              gridTemplateColumns: `repeat(2, 1fr)`,
              width: "100%",
              height: "auto",
              rowGap: 48,
              columnGap: 50,
            }}
          >
            {" "}
            <div
              css={(theme) =>
                mq({
                  marginTop: 12,
                  color: theme.colors.Gray_700,
                  lineHeight: "20px",
                  fontSize: [14, 14, 20],
                  textTransform: "capitalize",
                })
              }
            >
              Male
            </div>
            <div
              css={(theme) =>
                mq({
                  backgroundColor: theme.colors.Gray_100,
                  //   height: 67,
                  color: theme.colors.Gray_700,
                  borderRadius: 8,
                  width: ["70%", "70%", "100%"],
                  padding: "12px 14px",
                })
              }
            >
              {/* <div
                css={{
                  fontSize: 12,
                }}
              >
                Male
              </div> */}
              <div
                css={mq({
                  fontSize: [14, 14, 20],
                })}
              >
                {props.adult_male}
              </div>
            </div>
            <div
              css={(theme) =>
                mq({
                  marginTop: 12,
                  color: theme.colors.Gray_700,
                  lineHeight: "20px",
                  fontSize: [14, 14, 20],
                })
              }
            >
              Female
            </div>
            <div
              css={(theme) =>
                mq({
                  backgroundColor: theme.colors.Gray_100,
                  //   height: 67,
                  color: theme.colors.Gray_700,
                  borderRadius: 8,
                  width: ["70%", "70%", "100%"],
                  padding: "12px 14px",
                })
              }
            >
              {/* <div
                css={{
                  fontSize: 12,
                }}
              >
                Female
              </div> */}
              <div
                css={mq({
                  fontSize: [14, 14, 20],
                })}
              >
                {props.adult_female}
              </div>
            </div>
            <div
              css={(theme) =>
                mq({
                  marginTop: 12,
                  color: theme.colors.Gray_700,
                  lineHeight: "20px",
                  fontSize: [14, 14, 20],
                })
              }
            >
              Total
            </div>
            <div
              css={(theme) =>
                mq({
                  backgroundColor: theme.colors.Gray_100,
                  //   height: 67,
                  color: theme.colors.Gray_700,
                  borderRadius: 8,
                  width: ["70%", "70%", "100%"],
                  padding: "12px 14px",
                })
              }
            >
              {/* <div
                css={{
                  fontSize: 12,
                }}
              >
                Female
              </div> */}
              <div
                css={mq({
                  fontSize: [14, 14, 20],
                })}
              >
                {props.adult_female + props.adult_male}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeInfoComp;
