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
  status: 'INIT',
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

      const totalCells = state.setting.width * state.setting.height;
      if (state.openPoints.length === totalCells - state.minePoints.length) {
        state.status = 'WIN';
      } else if (overwrap(state.openPoints, state.minePoints)) {
        state.status = 'LOSE';
      }
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
export const selectStatus = (state: MsRootState) => state.game.status;
export const selectSetting = (state: MsRootState) => state.game.setting;
export const selectMinePoints = (state: MsRootState) => state.game.minePoints;
export const selectOpenPoints = (state: MsRootState) => state.game.openPoints;
export const selectFlagPoints = (state: MsRootState) => state.game.flagPoints;


//
// TODO: これどこに置く？
//
function overwrap(arr1: Point[], arr2: Point[]): boolean {
  for (const p of arr1) {
    if (arr2.filter(e => e.x === p.x).some(e => e.y === p.y)) {
      return true;
    }
  }

  return false;
}