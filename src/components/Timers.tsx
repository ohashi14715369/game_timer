import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";

import { RootState } from "../store";
import Timer from "./Timer";
import * as TimerModule from "../modules/Timer";

function TimersComponent() {
  const { timers } = useSelector((state: RootState) => state.timer);
  const dispatch = useDispatch();
  const create = (request: TimerModule.TimerCreateRequest) => dispatch(TimerModule.create(request));
  const start = (id: number) => dispatch(TimerModule.start(id));
  const pause = (id: number) => dispatch(TimerModule.pause(id));
  const remove = (id: number) => dispatch(TimerModule.remove(id));
  return (
    <div>
      {timers.map(timer => {
        return (
          <Timer
            key={timer.id}
            length={timer.length}
            left={timer.left}
            live={timer.live}
            onStart={() => start(timer.id)}
            onPause={() => pause(timer.id)}
            onRemove={() => dispatch(remove(timer.id))}
          />
        );
      })}
      <div>
        <Button onClick={e => create({ name: "hoge", length: 1000 })}>Add</Button>
      </div>
    </div>
  );
}
export default TimersComponent;
