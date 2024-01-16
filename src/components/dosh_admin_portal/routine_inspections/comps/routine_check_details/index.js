/** @jsxImportSource @emotion/react */
import axios from "axios";
import { main_url, cookies_id } from "@/src/details";
import React, { useState, useContext } from "react";
import useSWR, { useSWRConfig, mutate } from "swr";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import DashboadWrapperComp from "../../../nav_wrapper";
import facepaint from "facepaint";
import EmployeeInfoComp from "../../../factory_component/tabs/regsitration_components/employee_info_comp";
import FacRoutineDetailsComp from "./tabs/registration";
import { FactoryContext } from "@/src/context/factoryContext";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const RoutineCheckDetailsComp = () => {
  const router = useRouter();
  const fetcher = (url) =>
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get(cookies_id)}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        console.error("Error:", error);
      });
  const {
    data: single_report,
    error,
    isLoading,
  } = useSWR(
    `${main_url}/inventory/factory/routine-check?id=${router.query.id}`,
    fetcher
  );
  const factory = useContext(FactoryContext);

  console.log(single_report);

  const steps = [
    {
      title: "Factory information",
      click: () => null,
    },
    {
      title: "Document verification",
      click: () => null,
    },

    {
      title: "Payment verification",
      click: () => null,
    },

    {
      title: "Inspection report",
      click: () => update_progress(60),
    },
  ];
  return (
    <DashboadWrapperComp>
      {isLoading ? (
        <div
          css={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {" "}
          <div
            css={{
              width: 64,
              height: 64,
              margin: "50px 0px",
            }}
          >
            <img src="/svg/loader/loader.svg" />
          </div>
        </div>
      ) : (
        <div>
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
              {single_report?.data?.report?.factory?._occupier_name}
            </div>
          </div>
          <div
            css={(theme) => ({
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginTop: [16, 16, 60],
            })}
          >
            {/* <div
              css={mq({
                display: "grid",
                gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
                alignItems: "center",
                justifyContent: "space-between",
                rowGap: 0,
                columnGap: [2, 2, 10],
              })}
            >
              {steps.map((step) => (
                <div
                  key={step.title}
                  css={(theme) => ({
                    padding: "14px 28px",
                    backgroundColor:
                      factory.tab === step.title
                        ? theme.colors.Primary_500
                        : theme.colors.Primary_50,
                    fontSize: 12,
                    textAlign: "center",
                    cursor: "pointer",
                    color: factory.tab === step.title ? "#fff" : "#000",
                  })}
                  onClick={() => {
                    factory.set_tab(step.title);
                    step.click();
                  }}
                >
                  {step.title}
                </div>
              ))}
            </div> */}
          </div>
          {factory.tab === steps[0].title && <FacRoutineDetailsComp />}
          {/* {factory.tab === steps[1].title && <DocumentUploadTab />}
            {factory.tab === steps[2].title && <VerifyPaymentTab />}
            {factory.tab === steps[3].title && <InspectionReportComp />} */}
        </div>
      )}
    </DashboadWrapperComp>
  );
};

export default RoutineCheckDetailsComp;
