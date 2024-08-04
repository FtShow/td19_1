import { Dispatch } from "redux";
import { appActions } from "app/app.reducer";
import { BaseResponse } from "common/types/common.types";

/**
 *
 * * @template D Тип данных, содержащихся в ответе от сервера.
 *  * @param {BaseResponse<D>} data - Ответ от сервера, содержащий возможные сообщения об ошибках.
 *  * @param {Dispatch} dispatch - Функция для отправки действий в Redux store.
 *  * @param {boolean} [isShowGlobalError=true] - Флаг, указывающий, нужно ли показывать глобальную ошибку.
 */
export const handleServerAppError = <D>(data: BaseResponse<D>, dispatch: Dispatch, isShowGlobalError: boolean = true) => {
  if(isShowGlobalError){
    if (data.messages.length) {
      dispatch(appActions.setAppError({ error: data.messages[0] }));
    } else {
      dispatch(appActions.setAppError({ error: "Some error occurred" }));
    }

  }

  dispatch(appActions.setAppStatus({ status: "failed" }));
};
