import { Middleware, MiddlewareAPI, Dispatch } from "redux";

import * as TimerModule from "./modules/Timer";
import * as AppModule from "./modules/App";

export const appMiddleware: Middleware = ({ dispatch }: MiddlewareAPI<Dispatch<any>>) => (next: Dispatch) => (
  action: any
): any => {
  /* middlewareの処理 */
  switch (action.type) {
    case TimerModule.TimerActionType.RING:
      dispatch(AppModule.ringer(action.timerId));
      break;
  }
  return next(action);
};
