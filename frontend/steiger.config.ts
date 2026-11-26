import { defineConfig } from "steiger";
import fsd from "@feature-sliced/steiger-plugin";

export default defineConfig([
    ...fsd.configs.recommended,
    {
        files: ["./src/pages/**"],
        rules: { "fsd/no-segmentless-slices": "off" },
    },
    {
        files: ["./src/**"],
        rules: {
            "fsd/excessive-slicing": "off",
            "fsd/insignificant-slice": "off",
            "fsd/inconsistent-naming": "off",
        },
    },
]);