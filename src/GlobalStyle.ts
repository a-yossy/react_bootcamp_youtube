import { withStyles } from "@material-ui/styles";

export default withStyles({
  "@global": {
    html: {
      width: "100%",
      height: "100%",
    },
    body: {
      width: "100%",
      height: "100%",
    },
    "#root": {
      width: "100%",
      height: "100%",
    },

    img: { display: "block", maxWidth: "100%" },
  },
})(() => null);