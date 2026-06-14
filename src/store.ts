import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./react/login/state/loginSlice";

export const store = configureStore({
  reducer: {
    // Hier können die Reducer für die verschiedenen Slices hinzugefügt werden
    login: loginReducer,
  },
});

// Diese TS Typen können in den Komponenten verwendet werden, um den Zugriff auf den Store zu erleichtern
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
