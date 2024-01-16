/** @jsxImportSource @emotion/react */
import { useRouter } from "next/router";

import CreateRoutineReportComp from "./routine_checks_form";
import DashboadWrapperComp from "../../../nav_wrapper";
import facepaint from "facepaint";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const CreateReportComp = () => {
  const router = useRouter();

  return (
    <DashboadWrapperComp>
      <div
        css={mq({
          display: "flex",
          alignItems: "center",
          marginTop: [16, 16, 0],
          padding: ["16px 16px", "16px 16px", 0],
        })}
      >
        <div>
          {" "}
          <div
            css={mq({
              cursor: "pointer",
              marginRight: [16, 16, 38],
            })}
            onClick={() => router.back()}
          >
            <img
              css={mq({
                width: [8, 8, 24],
                height: [12, 12, 20],
              })}
              src="/svg/dashboard/arrow_left.svg"
            />
          </div>
        </div>
        <div
          css={mq({
            fontSize: [12, 12, 24],

            color: "#000",
            textTransform: "capitalize",
          })}
        >
          {/* {single_factory?.data?.factory?._occupier_name} */}
          {/* occupier name */}
        </div>
      </div>
      <CreateRoutineReportComp />
    </DashboadWrapperComp>
  );
};

export default CreateReportComp;
