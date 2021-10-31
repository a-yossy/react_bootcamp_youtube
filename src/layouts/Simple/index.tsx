import { Outlet } from "react-router-dom";
import useStyles from "layouts/Simple/style";

export const SimpleLayout = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Outlet />
    </div>
  );
};