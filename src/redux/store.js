import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
import rootReducer from './reducers';
//import loginReducer from './loginReducer' 

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer
})

// const store = configureStore({
//   reducer: {
//     login: persistedReducer,
//   },
// })
 
const persistor = persistStore(store)

export { store, persistor }