import { makeStyles } from "@material-ui/core";

const APP_BAR = 64;

export default makeStyles({
  root: {
    minHeight: "100%",
  },

  main: {
    paddingTop: APP_BAR + 30,
  },
});