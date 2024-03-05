import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

// slices
import authReducer from "./slices/auth";
import proposalReducer from "./slices/proposals";
import adminReducer from "./slices/admin";
import requestReducer from "./slices/requests";

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: ["auth", "admin"]
};

const productPersistConfig = {
  key: "product",
  storage,
  keyPrefix: "redux-",
  whitelist: ["sortBy", "checkout"]
};

const rootReducer = combineReducers({
  auth: authReducer,
  proposal: proposalReducer,
  admin: adminReducer,
  request: requestReducer,
});

export { rootPersistConfig, rootReducer };
