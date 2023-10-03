import dynamic from "next/dynamic";

const NewRegistrationComp = dynamic(
  import("@/src/components/dosh_admin_portal/tabs/new_registration"),
  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
);

// import NewRegistrationComp from "@/src/components/dosh_admin_portal/tabs/new_registration";

export default NewRegistrationComp;
