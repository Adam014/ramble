import { configureStore } from "@reduxjs/toolkit";

import { costApi } from "@components/services/api/costApi";

export default configureStore({
    reducer: {
        [costApi.reducerPath]: costApi.reducer,
    },
    middleware: ( getDefaultMiddleware ) =>
        getDefaultMiddleware().concat(costApi.middleware),
});