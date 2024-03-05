import { configureStore } from '@reduxjs/toolkit';
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { rootPersistConfig, rootReducer } from './rootReducer';
import { resetAuth } from './slices/auth';
import { resetProposals } from './slices/proposals';
import { resetAdmin } from './slices/admin';
import { resetRequests } from './slices/requests';

// ----------------------------------------------------------------------

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

const persistor = persistStore(store);

export function logOut() {
  return async () => {
    await dispatch(resetAuth());
    await dispatch(resetProposals());
    await dispatch(resetAdmin());
    await dispatch(resetRequests());
    await persistor.purge();
    await localStorage.clear();
  };
}

const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { store, persistor, dispatch, useSelector, useDispatch };
