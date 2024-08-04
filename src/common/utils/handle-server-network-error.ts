import { Dispatch } from "redux";
import axios, { AxiosError } from "axios";
import { appActions } from "app/app.reducer";

/**
 *
 * @param {unknown} e - Ошибка, возникшая при выполнении запроса к серверу.
 * @param {Dispatch} dispatch - Функция для отправки действий в Redux store.
 */
export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
  const err = e as Error | AxiosError<{ error: string }>;
  if (axios.isAxiosError(err)) {
    const error = err.message ? err.message : "Some error occurred";
    dispatch(appActions.setAppError({ error }));
  } else {
    dispatch(appActions.setAppError({ error: `Native error ${err.message}` }));
  }
  dispatch(appActions.setAppStatus({ status: "failed" }));
};
