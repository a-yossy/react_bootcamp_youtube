import { Typography } from "@material-ui/core";
import useStyles from "components/VideoCard/HeaderTitle/style";

export type HeaderTitleProps = {
  title: string;
};

export const HeaderTitle = ({ title }: HeaderTitleProps) => {
  const styles = useStyles();

  return (
    <Typography
      className={styles.root}
      variant="subtitle1"
      component="h3"
    >
      {title}
    </Typography>
  )
}
