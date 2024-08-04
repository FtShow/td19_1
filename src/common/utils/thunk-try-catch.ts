import { AppDispatch, AppRootStateType } from "app/store";
import { handleServerNetworkError } from "common/utils/handle-server-network-error";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { appActions } from "app/app.reducer";
import { BaseResponse } from "../types/common.types";

/**
 *
 * * @template T Тип возвращаемого значения функции logic.
 *  * @param {BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponse>} thunkAPI - API для работы с thunk, включает методы dispatch и rejectWithValue.
 *  * @param {() => Promise<T>} logic - Асинхронная функция, содержащая основную логику, которую нужно выполнить.
 *  * @returns {Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>>} Возвращает результат выполнения функции logic или вызов rejectWithValue в случае ошибки.
 */
export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponse>,
  logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    return await logic();
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  } finally {
    dispatch(appActions.setAppStatus({ status: "idle" }));
  }
};
