import dynamic from "next/dynamic";

const HomePage = dynamic(import("@/src/components/home"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

// import HomePage from "@/src/components/home";

export default HomePage;
