/** @jsxImportSource @emotion/react */
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import React, { useState, useContext } from "react";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import useSWR, { useSWRConfig, mutate } from "swr";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import EmployeeInfoComp from "./regsitration_components/employee_info_comp";
import { main_url, cookies_id } from "@/src/details";
import DeclarationPopup from "./comps/declaration_popup";
import { FactoryContext } from "@/src/context/factoryContext";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
const CorDraftComp = () => {
  const [value, setValue] = useState("");
  const [willAmmend, setWillAmmend] = useState(false);
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
  } = useSWR(`${main_url}/dosh/factory/${router.query.id}`, fetcher);

  const {
    data: single_factory_doc,
    error: doc_error,
    isLoading: doc_isLoading,
  } = useSWR(
    isLoading
      ? null
      : `${main_url}/dosh/factory-docs?factory_id=${single_factory.data.factory._id}`,
    fetcher
  );

  console.log(single_factory);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];
  return (
    <div
      css={{
        display: "center",
        justifyContent: "center",
      }}
    >
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
            css={(theme) => ({
              marginTop: 54,

              border: `1px solid ${theme.colors.Primary_100}`,
              padding: "50px 32px",
              width: "90%",
              borderRadius: 8,
            })}
          >
            <div
              css={{
                fontSize: 32,
              }}
            >
              CoR draft
            </div>
            <div
              css={{
                marginTop: 80,
              }}
            >
              <div>
                <div
                  css={{
                    display: "grid",
                    gridTemplateColumns: `repeat(2, 1fr)`,
                    rowGap: 48,
                    columnGap: 50,
                    marginTop: 24,
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
                      Name of occupier
                    </div>
                    <div
                      css={(theme) => ({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                    >
                      {single_factory.data.factory._occupier_name}
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
                      Postal address of occupier
                    </div>
                    <div
                      css={(theme) => ({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                    >
                      {single_factory.data.factory.phone_number}
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
                      Nature of work
                    </div>
                    <div
                      css={(theme) => ({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                    >
                      {single_factory.data.factory.type}
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
                      Phone number of occupier
                    </div>
                    <div
                      css={(theme) => ({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                    >
                      {single_factory.data.factory.postal_address}
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
                      Period of validity of certificate
                    </div>
                    <div
                      css={(theme) => ({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                    >
                      {
                        single_factory.data.factory.inspection_report
                          .inspection_date
                      }
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
                      Location of Factory
                    </div>
                    <div
                      css={(theme) => ({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                    >
                      {single_factory.data.factory.address}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                factory.set_tab("Preview CoR");
              }}
            >
              <div
                css={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div>Submit report</div>
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
      )}

      <AnimatePresence initial={false}>
        {willAmmend && (
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                ease: "easeInOut",
                duration: 0.4,
              }}
              css={{
                position: "fixed",
                width: "100vw",
                height: "100vh",
                // zIndex: 2,
                zIndex: 3,
                backgroundColor: "rgb(0,0,0,0.1)",
                right: 0,
                top: 0,
                opacity: 0,
              }}
              onClick={() => setWillAmmend(false)}
            >
              {" "}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 900 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 900 }}
              transition={{
                ease: "easeInOut",
                // duration: 0.4,
              }}
              id="location"
              css={(theme) => ({
                position: "fixed",
                width: ["90vw", 524, 524],
                height: 427,
                borderRadius: 14,
                zIndex: 5,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
              })}
            >
              {/* <CreateRiderAccount close={() => router.back()} /> */}
              <DeclarationPopup
                close={() => setWillAmmend(false)}
                ammend={() => {
                  setWillAmmend(false);
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CorDraftComp;
