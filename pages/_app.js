import "@/styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import { AuthProvider } from "@/src/context/authContext";
import { FactoryProvider } from "@/src/context/factoryContext";

const theme = {
  colors: {
    overlay: "#1D293980",
    Success_900: "#054F31",
    Success_800: "#05603A",
    Success_700: "#027A48",
    Success_600: "#039855",
    Success_500: "#12B76A",
    Success_400: "#32D583",
    Success_300: "#6CE9A6",
    Success_200: "#A6F4C5",
    Success_100: "#D1FADF",
    Success_50: "#ECFDF3",
    Success_25: "#F6FEF9",
    Error_900: "#7A271A",
    Error_800: "#912018",
    Error_700: "#B42318",
    Error_600: "#D92D20",
    Error_500: "#F04438",
    Error_400: "#F97066",
    Error_300: "#FDA29B",
    Error_200: "#FECDCA",
    Error_100: "#FEE4E2",
    Error_50: "#FEF3F2",
    Error_25: "#FFFBFA",
    Primary_900: "#092A22",
    Primary_800: "#0D3E32",
    Primary_700: "#115343",
    Primary_600: "#166854",
    Primary_500: "#1A7D65",
    Primary_400: "#40937F",
    Primary_300: "#66A898",
    Primary_200: "#8CBEB2",
    Primary_100: "#B3D4CC",
    Primary_50: "#D1E5E0",
    Primary_25: "#F3F8F7",
    Gray_900: "#101828",
    Gray_800: "#1D2939",
    Gray_700: "#344054",
    Gray_600: "#475467",
    Gray_500: "#667085",
    Gray_400: "#98A2B3",
    Gray_300: "#D0D5DD",
    Gray_200: "#EAECF0",
    Gray_100: "#F2F4F7",
    Gray_50: "#F9FAFB",
    Gray_25: "#FCFCFD",
    Warning_900: "#7A2E0E",
    Warning_800: "#93370D",
    Warning_700: "#B54708",
    Warning_600: "#DC6803",
    Warning_500: "#F79009",
    Warning_400: "#FDB022",
    Warning_300: "#FEC84B",
    Warning_200: "#FEDF89",
    Warning_100: "#FEF0C7",
    Warning_50: "#FFFAEB",
    Warning_25: "#FFFCF5",
  },
  fonts: {
    navMarginTop: 54,
    navMarginBotom: 34,
  },
  font_sizes: {
    Body_Tiny_400: 10,
    Body_Small_400: 12,
    Body_400: 14,
    Body_Large_400: 16,
    H5_400: 18,
    H4_400: 20,
    H3_400: 24,
    H2_400_size: 28,
    H1_400: 32,
  },
  font_weight: {
    size_400: 400,
    size_500: 500,
    size_700: 700,
  },
};
export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <FactoryProvider>
          <Component {...pageProps} />
        </FactoryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
