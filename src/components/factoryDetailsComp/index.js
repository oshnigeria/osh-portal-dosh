/** @jsxImportSource @emotion/react */
import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { main_url } from "@/src/details";
import { useRouter } from "next/router";

const FactoryDocComp = (props) => {
  const [options, setOptions] = useState(false);
  const router = useRouter();

  return (
    <div>
      <div
        css={(theme) => ({
          width: "auto",
          height: "auto",
          borderRadius: 16,
          marginBottom: 22,

          padding: "18px 18px",
          backgroundColor: theme.colors.Primary_50,
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
            <div
              css={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              <div>
                <img
                  css={{
                    width: 18,
                    height: 20,
                  }}
                  src="/svg/dashboard/document.svg"
                />
              </div>
              <div
                css={{
                  marginLeft: 16,
                }}
              >
                {props.name}.{props.type}
              </div>
            </div>
          </div>
          <div
            css={{
              position: "relative",
            }}
            onClick={() => setOptions(!options)}
          >
            <img
              css={{
                width: 24,
                height: 24,
              }}
              src="/svg/dashboard/more_circle.svg"
            />
            <AnimatePresence initial={false}>
              {options && (
                <div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      ease: "easeInOut",
                      // duration: 0.4,
                    }}
                    id="location"
                    css={(theme) => ({
                      position: "absolute",
                      borderRadius: 4,

                      width: "auto",
                      height: "auto",
                      boxShadow:
                        "0px 0px 0px 0px rgba(107, 133, 127, 0.20), 0px 0px 1px 0px rgba(107, 133, 127, 0.19), 2px 2px 3px 0px rgba(107, 133, 127, 0.17), 4px 4px 4px 0px rgba(107, 133, 127, 0.10), 7px 8px 4px 0px rgba(107, 133, 127, 0.03), 12px 12px 5px 0px rgba(107, 133, 127, 0.00)",
                      zIndex: 50,

                      right: 24,
                      top: 12,

                      margin: "auto",

                      backgroundColor: "#fff",
                    })}
                  >
                    <div
                      css={{
                        padding: "24px 44px",
                      }}
                    >
                      <a
                        href={`${main_url}/inventory/factory/wr/file?factory_id=${props.factory_id}&file_key=${props.file_key}&doc_type=${props.doc_type}`}
                        css={(theme) => ({
                          display: "flex",
                          cursor: "pointer",
                          textDecoration: "none",
                          color: theme.colors.Gray_900,
                        })}
                        // onClick={() => {
                        //   props.download();
                        // }}
                      >
                        Download
                      </a>
                    </div>
                    <div
                      css={{
                        padding: "24px 44px",
                        cursor: "pointer",
                        display:
                          router.pathname == "/dashboard/trash"
                            ? "none"
                            : "block",
                      }}
                      onClick={() => props.delete()}
                    >
                      Delete
                    </div>
                    <div
                      css={{
                        padding: "24px 44px",
                        cursor: "pointer",
                        display:
                          router.pathname == "/dashboard/trash"
                            ? "block"
                            : "none",
                      }}
                      onClick={() => props.restore()}
                    >
                      Restore
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactoryDocComp;
