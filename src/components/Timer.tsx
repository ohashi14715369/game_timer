import * as React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import DeleteIcon from "@material-ui/icons/Delete";

import * as moment from "moment";

const useStyle = makeStyles(theme => {
  return createStyles({ root: {} });
});

interface Props {
  length: number;
  left: number;
  live: boolean;
  onStart: () => void;
  onPause: () => void;
  onRemove: () => void;
}

function Timer(props: Props) {
  const classes = useStyle();
  const { left, live, onStart, onPause, onRemove } = props;
  const disp = left < 0 ? left * -1 : left;
  return (
    <div className={classes.root}>
      <Box bgcolor={left < 0 ? "error.main" : "text.primary"}>
        <Grid container spacing={3}>
          <Grid item>{moment.utc(disp).format("HH:mm:ss")}</Grid>
          <Grid item>
            {live ? (
              <IconButton onClick={onPause}>
                <PauseIcon />
              </IconButton>
            ) : (
              <IconButton onClick={onStart}>
                <PlayArrowIcon />
              </IconButton>
            )}
          </Grid>
          <Grid item>
            <IconButton onClick={onRemove}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Timer;
