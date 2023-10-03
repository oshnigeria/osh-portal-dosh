/** @jsxImportSource @emotion/react */

const EmployeeInfoComp = (props) => {
  return (
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
            css={{
              display: "grid",
              gridTemplateColumns: `repeat(3, 1fr)`,
              width: "100%",
              height: "auto",
              rowGap: 48,
              columnGap: 50,
            }}
          >
            {" "}
            <div
              css={(theme) => ({
                marginTop: 12,
                color: theme.colors.Gray_700,
                lineHeight: "20px",
                fontSize: 20,
              })}
            >
              Adults
            </div>
            <div
              css={(theme) => ({
                backgroundColor: theme.colors.Gray_100,
                //   height: 67,
                borderRadius: 8,
                width: "100%",
                padding: "12px 14px",
              })}
            >
              <div
                css={{
                  fontSize: 12,
                }}
              >
                Male
              </div>
              <div
                css={{
                  fontSize: 20,
                }}
              >
                {props.adult_male}
              </div>
            </div>
            <div
              css={(theme) => ({
                backgroundColor: theme.colors.Gray_100,
                //   height: 67,
                borderRadius: 8,
                width: "100%",
                padding: "12px 14px",
              })}
            >
              <div
                css={{
                  fontSize: 12,
                }}
              >
                Female
              </div>
              <div
                css={{
                  fontSize: 20,
                }}
              >
                {props.adult_female}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            css={{
              display: "grid",
              gridTemplateColumns: `repeat(3, 1fr)`,
              width: "100%",
              height: "auto",
              rowGap: 48,
              columnGap: 50,
            }}
          >
            {" "}
            <div
              css={(theme) => ({
                marginTop: 12,
                color: theme.colors.Gray_700,
                lineHeight: "20px",
                fontSize: 20,
              })}
            >
              Youths
            </div>
            <div
              css={(theme) => ({
                backgroundColor: theme.colors.Gray_100,
                //   height: 67,
                borderRadius: 8,
                width: "100%",
                padding: "12px 14px",
              })}
            >
              <div
                css={{
                  fontSize: 12,
                }}
              >
                Male
              </div>
              <div
                css={{
                  fontSize: 20,
                }}
              >
                {props.youths_male}
              </div>
            </div>
            <div
              css={(theme) => ({
                backgroundColor: theme.colors.Gray_100,
                //   height: 67,
                borderRadius: 8,
                width: "100%",
                padding: "12px 14px",
              })}
            >
              <div
                css={{
                  fontSize: 12,
                }}
              >
                Female
              </div>
              <div
                css={{
                  fontSize: 20,
                }}
              >
                {props.youths_female}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeInfoComp;
