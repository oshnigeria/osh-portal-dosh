/** @jsxImportSource @emotion/react */
import React, { useRef } from "react";

import ReactToPrint from "react-to-print";

const PDFComp = () => {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />

      <div
        ref={componentRef}
        css={{
          display: "flex",
          justifyContent: "center",
          fontFamily: "Times New Roman",
          backgroundImage: "url('/cert/coat_of_arms_light.png')",
          objectFit: "cover",
          backgroundPosition: "center center",

          backgroundRepeat: "no-repeat",
          //   width: "100vw",
          height: "100vh",
        }}
      >
        <div
          css={{
            width: "60%",
          }}
        >
          <div
            css={{
              display: "flex",
              justifyContent: "center",
              marginTop: 40,
            }}
          >
            <img
              src="/cert/coat_of_arms.png"
              css={{
                width: 102,
                height: 82,
              }}
            />
          </div>
          <div
            css={{
              textAlign: "center",
              marginTop: 12,
              fontFamily: "Times New Roman",
              fontWeight: 700,
              fontSize: 12,
            }}
          >
            FEDERAL REPUBLIC OF NIGERIA
          </div>
          <div
            css={{
              textAlign: "center",
              marginTop: 4,
              fontFamily: "Times New Roman",

              fontSize: 12,
              fontStyle: "italic",
            }}
          >
            The Factories Act, CAP F1 LFN 2004
          </div>
          <div
            css={(theme) => ({
              textAlign: "center",
              marginTop: 18,
              fontFamily: "Times New Roman",
              color: theme.colors.Primary_400,
              fontSize: 18,
              fontWeight: 700,
            })}
          >
            CERTIFICATE OF REGISTRATION OF FACTORY
          </div>
          <div
            css={(theme) => ({
              textAlign: "center",
              marginTop: 8,
              fontFamily: "Times New Roman",
              color: theme.colors.Gray_800,
              fontSize: 12,
            })}
          >
            Section 2(2) ; 3 (2)
          </div>
          <div
            css={{
              display: "flex",
              justifyContent: "right",
              marginTop: 18,
            }}
          >
            <div>
              <div
                css={{
                  marginBottom: 8,
                  fontSize: 12,
                }}
              >
                Treasury Reciept No
              </div>
              <div
                css={{
                  marginBottom: 8,
                  fontSize: 12,
                }}
              >
                Certificate Number
              </div>
              <div
                css={{
                  marginBottom: 8,
                  fontSize: 12,
                }}
              >
                Date of issue
              </div>
            </div>
          </div>
          <div
            css={(theme) => ({
              marginTop: 28,
              fontFamily: "Times New Roman",
              color: theme.colors.Gray_800,
              fontSize: 12,
            })}
          >
            I hereby certify that the Factory named below has been duly
            registered in pursuance of section 3 of the Factories Act; 2004
          </div>
          <div
            css={{
              display: "flex",
              justifyContent: "left",
              marginTop: 18,
              fontFamily: "Times New Roman",
            }}
          >
            <div>
              <div
                css={{
                  marginBottom: 8,
                  fontSize: 12,
                }}
              >
                Name of Occupier
              </div>
              <div
                css={{
                  marginBottom: 8,
                  fontSize: 12,
                }}
              >
                Registration No
              </div>
              <div
                css={{
                  marginBottom: 8,
                  fontSize: 12,
                }}
              >
                Postal Address of Occupier
              </div>
              <div
                css={{
                  marginBottom: 8,
                  fontSize: 12,
                }}
              >
                Location of Factory
              </div>
              <div
                css={{
                  marginBottom: 8,
                  fontSize: 12,
                }}
              >
                Purpose or work in respect of which premises have been
                registered
              </div>
              <div
                css={{
                  marginBottom: 8,
                  fontSize: 12,
                }}
              >
                Period of validity of Certificate
              </div>
            </div>
          </div>
          <div
            css={{
              display: "flex",
              justifyContent: "right",
              marginTop: 30,
            }}
          >
            <div>
              <div
                css={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/cert/Union.svg"
                  css={{
                    width: 60,
                    height: 20,
                  }}
                />
              </div>
              <div
                css={{
                  marginTop: 8,
                  fontSize: 12,
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                Director’s name here
              </div>
              <div
                css={{
                  marginTop: 8,
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                Director’s name here
              </div>
            </div>
          </div>

          <div
            css={{
              marginTop: 40,
            }}
          >
            <div
              css={{
                marginTop: 8,
                fontSize: 12,
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              NOTES
            </div>
            <ol
              css={{
                fontFamily: "Times New Roman",
                fontSize: 12,
              }}
            >
              <li>
                This Certificate is issued under and solely for the purpose of
                the Factories Act; 2004 and valid only in respect of the factory
                occupier and purpose or work name above.
              </li>
              <li>
                If at any time after the issue of this Certificate any change
                occurs in respect of the particulars set out above, the occupier
                to which this notice relates must inform the Director of
                Factories Forthwith, in writing, of such changes. Failure to do
                so is a punishable offence under this Act.{" "}
              </li>

              <li>
                This Certificate must be attached to a flap at the front of the
                General Register, abd the Number and Date of issue of ths
                Certificate entered in paragraph 4 of Past 1 of hte General
                Register{" "}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFComp;
