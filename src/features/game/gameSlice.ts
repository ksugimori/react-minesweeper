import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Point from "../../models/Point";
import { GameState, MsRootState } from "../../app/App.interface";

// TODO: ランダムに設定
const defaultMines: Point[] = [
  { x: 3, y: 0 },
  { x: 4, y: 1 },
  { x: 8, y: 0 },
  { x: 8, y: 1 },
  { x: 7, y: 2 },
  { x: 8, y: 2 }
]

const initialState: GameState = {
  setting: {
    width: 9,
    height: 9
  },
  minePoints: defaultMines,
  flagPoints: [],
  openPoints: []
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setOpenPoints: (state, action: PayloadAction<Point[]>) => {
      state.openPoints = action.payload;
    },
    setFlagPoints: (state, action: PayloadAction<Point[]>) => {
      state.flagPoints = action.payload;
    }
  }
})

export default gameSlice.reducer;

//
// Actions
//
export const { setOpenPoints, setFlagPoints } = gameSlice.actions;

//
// Selectors
//
export const selectSetting = (state: MsRootState) => state.game.setting;
export const selectMinePoints = (state: MsRootState) => state.game.minePoints;
export const selectOpenPoints = (state: MsRootState) => state.game.openPoints;
export const selectFlagPoints = (state: MsRootState) => state.game.flagPoints;