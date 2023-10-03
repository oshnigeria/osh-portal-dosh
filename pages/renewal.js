import dynamic from "next/dynamic";

const RenewalComp = dynamic(
  import("@/src/components/dosh_admin_portal/tabs/renewal"),
  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
);

// import RenewalComp from "@/src/components/dosh_admin_portal/tabs/renewal";

export default RenewalComp;
