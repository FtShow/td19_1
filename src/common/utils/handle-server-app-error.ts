import { Dispatch } from "redux";
import { appActions } from "app/app.reducer";
import { BaseResponse } from "common/types/common.types";

/**
 *
 * @param data
 * @param dispatch
 * @param isShowGlobalError
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
