import dynamic from "next/dynamic";

const AmmendmentComp = dynamic(
  import("@/src/components/dosh_admin_portal/tabs/amendment"),
  {
    ssr: false,
    loading: () => (
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
    ),
  }
);

// import AmmendmentComp from "@/src/components/dosh_admin_portal/tabs/amendment";

export default AmmendmentComp;
