/** @jsxImportSource @emotion/react */
import axios from "axios";
import { main_url, cookies_id } from "@/src/details";
import React, { useState, useContext } from "react";
import EmployeeInfoComp from "./regsitration_components/employee_info_comp";
import useSWR, { useSWRConfig, mutate } from "swr";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { FactoryContext } from "@/src/context/factoryContext";
const FactoryRegistration = () => {
  const router = useRouter();
  const factory = useContext(FactoryContext);
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
    data: single_factory,
    error,
    isLoading,
  } = useSWR(`${main_url}/dosh/incident/${router.query.id}`, fetcher);

  const {
    data: single_factory_doc,
    error: doc_error,
    isLoading: doc_isLoading,
  } = useSWR(
    isLoading
      ? null
      : `${main_url}/dosh/factory-docs?factory_id=${single_factory?.data?.factory?._id}`,
    fetcher
  );

  console.log(single_factory);
  return (
    <div>
      {isLoading || error ? (
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
            <img src="/svg/loader/loader-green.svg" />
          </div>
        </div>
      ) : (
        <div
          css={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            css={(theme) => ({
              marginTop: 54,

              border: `1px solid ${theme.colors.Primary_100}`,
              padding: "50px 32px",
              width: "90%",
              borderRadius: 8,
            })}
          >
            <div
              css={(theme) => ({
                fontSize: 32,
                color: theme.colors.Gray_700,
                textTransform: "capitalize",
              })}
            >
              Incident Form
            </div>
            <div
              css={{
                marginTop: 48,
              }}
            >
              <div
                css={{
                  display: "grid",
                  gridTemplateColumns: `repeat(2, 1fr)`,
                  rowGap: 48,
                  columnGap: 50,
                }}
              >
                <div>
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    Employer name
                  </div>
                  <div
                    css={(theme) => ({
                      marginTop: 12,
                      color: theme.colors.Gray_700,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    {single_factory.data.incident?.factory_name}
                  </div>
                </div>
                <div>
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    Is the company registered
                  </div>
                  <div
                    css={(theme) => ({
                      marginTop: 12,
                      color: theme.colors.Gray_700,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    {single_factory.data.incident?.is_company_registered
                      ? "Yes"
                      : "No"}
                  </div>
                </div>
                <div>
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    State of factory location
                  </div>
                  <div
                    css={(theme) => ({
                      marginTop: 12,
                      color: theme.colors.Gray_700,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    {single_factory.data.incident?.state}
                  </div>
                </div>
                <div>
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    Company Registration number
                  </div>
                  <div
                    css={(theme) => ({
                      marginTop: 12,
                      color: theme.colors.Gray_700,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    {single_factory.data.incident?.registration_number}
                  </div>
                </div>
                <div>
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    Address of factory where accident occurred
                  </div>
                  <div
                    css={(theme) => ({
                      marginTop: 12,
                      color: theme.colors.Gray_700,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    {single_factory.data.incident?.address_of_factory}
                  </div>
                </div>
                <div>
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    Nature of work done in factory
                  </div>
                  <div
                    css={(theme) => ({
                      marginTop: 12,
                      color: theme.colors.Gray_700,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    {single_factory.data.incident?.nature_of_factory_work}
                  </div>
                </div>
                <div>
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    Phone number
                  </div>
                  <div
                    css={(theme) => ({
                      marginTop: 12,
                      color: theme.colors.Gray_700,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    {single_factory.data.incident?.phone_number_of_reporter}
                  </div>
                </div>
                <div>
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    Exact place where accident or dangerous occurrence happened
                  </div>
                  <div
                    css={(theme) => ({
                      marginTop: 12,
                      color: theme.colors.Gray_700,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    {single_factory.data.incident?.place_of_occurence}
                  </div>
                </div>
                {/* <div>
                  <div
                    css={(theme) => ({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    Employer name
                  </div>
                  <div
                    css={(theme) => ({
                      marginTop: 12,
                      color: theme.colors.Gray_700,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                  >
                    {single_factory.data.incident?.factory_name}
                  </div>
                </div> */}
              </div>
              <div
                css={{
                  borderBottom: "1px solid #EAECF0",
                  margin: "48px 0px",
                }}
              ></div>
              <div
                css={{
                  marginBottom: 48,
                }}
              >
                <div
                  css={(theme) => ({
                    color: theme.colors.Gray_400,
                    lineHeight: "20px",
                    fontSize: 20,
                  })}
                >
                  Victim name
                </div>
                <div
                  css={(theme) => ({
                    marginTop: 12,
                    color: theme.colors.Gray_700,
                    lineHeight: "20px",
                    fontSize: 20,
                  })}
                >
                  {single_factory.data.incident?.victim_name}
                </div>
              </div>
              <div
                css={{
                  marginBottom: 48,
                }}
              >
                <div
                  css={(theme) => ({
                    color: theme.colors.Gray_400,
                    lineHeight: "20px",
                    fontSize: 20,
                  })}
                >
                  Gender
                </div>
                <div
                  css={(theme) => ({
                    marginTop: 12,
                    color: theme.colors.Gray_700,
                    lineHeight: "20px",
                    fontSize: 20,
                  })}
                >
                  {single_factory.data.incident?.victim_gender}
                </div>
              </div>
              <div
                css={{
                  marginBottom: 48,
                }}
              >
                <div
                  css={(theme) => ({
                    color: theme.colors.Gray_400,
                    lineHeight: "20px",
                    fontSize: 20,
                  })}
                >
                  Age
                </div>
                <div
                  css={(theme) => ({
                    marginTop: 12,
                    color: theme.colors.Gray_700,
                    lineHeight: "20px",
                    fontSize: 20,
                  })}
                >
                  {single_factory.data.incident?.victim_age}
                </div>
              </div>
              <div
                css={{
                  marginBottom: 48,
                }}
              >
                <div
                  css={(theme) => ({
                    color: theme.colors.Gray_400,
                    lineHeight: "20px",
                    fontSize: 20,
                  })}
                >
                  Precise occupation
                </div>
                <div
                  css={(theme) => ({
                    marginTop: 12,
                    color: theme.colors.Gray_700,
                    lineHeight: "20px",
                    fontSize: 20,
                  })}
                >
                  {single_factory.data.incident?.precise_ocupation}
                </div>
              </div>
              <div
                css={{
                  marginBottom: 48,
                }}
              >
                <div
                  css={(theme) => ({
                    color: theme.colors.Gray_400,
                    lineHeight: "20px",
                    fontSize: 20,
                  })}
                >
                  Date of accident or dangerous occurrence
                </div>
                <div
                  css={(theme) => ({
                    marginTop: 12,
                    color: theme.colors.Gray_700,
                    lineHeight: "20px",
                    fontSize: 20,
                  })}
                >
                  {single_factory.data.incident?.date_of_incidence}
                </div>
              </div>
              <div
                css={{
                  marginBottom: 48,
                }}
              >
                <div
                  css={(theme) => ({
                    color: theme.colors.Gray_400,
                    lineHeight: "20px",
                    fontSize: 20,
                  })}
                >
                  Hour of accident or dangerous occurrence
                </div>
                <div
                  css={(theme) => ({
                    marginTop: 12,
                    color: theme.colors.Gray_700,
                    lineHeight: "20px",
                    fontSize: 20,
                  })}
                >
                  {single_factory.data.incident?.hour_of_incidence}
                </div>
              </div>
              <div
                css={{
                  marginBottom: 48,
                }}
              >
                <div
                  css={(theme) => ({
                    color: theme.colors.Gray_400,
                    lineHeight: "20px",
                    fontSize: 20,
                  })}
                >
                  Full details of how the accident happened
                </div>
                <div
                  css={(theme) => ({
                    marginTop: 12,
                    color: theme.colors.Gray_700,
                    lineHeight: "20px",
                    fontSize: 20,
                  })}
                  dangerouslySetInnerHTML={{
                    __html: single_factory.data.incident?.acident_report,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        css={{
          marginTop: 64,
          display: "flex",
          justifyContent: "right",
        }}
      >
        <button
          css={(theme) => ({
            height: 56,
            borderRadius: 30,
            width: 356,
            //   padding: ["10px 16px", "10px 16px", "16px 24px"],
            padding: "16px 24px",
            fontSize: 20,
            cursor: "pointer",
            marginRight: 20,
            fontWeight: 600,
            lineHeight: "17px",
            border: "none",
            display: "flex",
            justifyContent: "center",
            color: "#fff",
            backgroundColor: theme.colors.Primary_500,
          })}
          type="submit"
          onClick={() => {
            // factory_details.add_factory_details(formData);
            factory.set_tab("Document verification");
          }}
        >
          <div
            css={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div>Verify & continue</div>
            <div
              css={{
                marginLeft: 8,
              }}
            >
              <img
                css={{
                  width: 24,
                  height: 24,
                }}
                src="/svg/registration/left_arrow.svg"
              />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default FactoryRegistration;
