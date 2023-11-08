import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./features/alertSlice";
import { UserSlice } from "./features/UserSlice";

export default configureStore({
  reducer: {
    alert: alertSlice.reducer,
    user: UserSlice.reducer,
  },
});
