import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Point from "../../models/Point";
import { GameState, MsRootState } from "../../app/App.interface";

const initialState: GameState = {
  status: 'INIT',
  setting: { width: 9, height: 9, numMines: 10 },
  minePoints: [],
  flagPoints: [],
  openPoints: []
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setOpenPoints: (state, action: PayloadAction<Point[]>) => {
      if (state.status === 'INIT') {
        state.status = 'PLAY';
      }
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
    },
    setMinePoints: (state, action: PayloadAction<Point[]>) => {
      state.minePoints = action.payload;
    }
  }
})

export default gameSlice.reducer;

//
// Actions
//
export const { setOpenPoints, setFlagPoints, setMinePoints } = gameSlice.actions;

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