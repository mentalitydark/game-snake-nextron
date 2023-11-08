import { createContext } from "react";
import type { GameContextProps } from "./game-types";

export const GameContext = createContext({} as GameContextProps)