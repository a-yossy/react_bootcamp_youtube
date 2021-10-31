import { InputBase, Paper } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "templates/DashboardHeader/SearchBar/style"

export const SearchBar = () => {
  const styles = useStyles();

  return (
    <Paper className={styles.root} elevation={0} variant="outlined">
      <InputBase className={styles.input} placeholder="検索" />
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>
    </Paper>
  );
};