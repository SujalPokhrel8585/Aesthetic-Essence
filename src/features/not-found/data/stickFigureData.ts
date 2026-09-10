import type { StickFigure } from "../../../types/notFound";

export const STICK_FIGURES: StickFigure[] = [
  {
    top: "0%",
    src: "https://cdn.21st.dev/assets/mirror/54/54f366bdbf75b7a2d3b9f2264c3ada12aefcaf6e6a467bcecc856ffcd686e52e.svg",
    baseRotate: -90,
    speedX: 1500,
  },
  {
    top: "10%",
    src: "https://cdn.21st.dev/assets/mirror/7e/7e48603d6fd3fac9720b25b4b6a06d107feea2d21ef8fa0720921808b9808514.svg",
    speedX: 3000,
    speedRotation: 2000,
  },
  {
    top: "20%",
    src: "https://cdn.21st.dev/assets/mirror/4f/4fd3a604a36cc8811c341ef3221010ed11e2563d4add29901922d7464c28c186.svg",
    speedX: 5000,
    speedRotation: 1000,
  },
  {
    top: "25%",
    src: "https://cdn.21st.dev/assets/mirror/54/54f366bdbf75b7a2d3b9f2264c3ada12aefcaf6e6a467bcecc856ffcd686e52e.svg",
    speedX: 2500,
    speedRotation: 1500,
  },
  {
    top: "35%",
    src: "https://cdn.21st.dev/assets/mirror/54/54f366bdbf75b7a2d3b9f2264c3ada12aefcaf6e6a467bcecc856ffcd686e52e.svg",
    speedX: 2000,
    speedRotation: 300,
  },
  {
    bottom: "5%",
    src: "https://cdn.21st.dev/assets/mirror/66/668d66f4c4d1dbc5c421692b4e5ad644c0f11f0327da214bcae21f78816c6b2f.svg",
    // no speedX: stays put, matching the source's index-5 skip
  },
];
