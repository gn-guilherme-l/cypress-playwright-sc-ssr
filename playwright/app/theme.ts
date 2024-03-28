import { DefaultTheme } from "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        fg: string;
        bg: string;
    }
}

export type Theme = DefaultTheme;
