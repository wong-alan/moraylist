export * from "gsap";
export * from "@gsap/react";
export * from "gsap/Flip";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(useGSAP, Flip);