import { Button, Card, TextField, Typography } from "@material-ui/core";
import { Logo } from "components/Logo";
import { useLogin } from "hooks/Authentication/useLogin";
import useStyles from "pages/Login/style";

export const Login = () => {
  const styles = useStyles();
  const { ref, error, loading, login } = useLogin();

  return (
    <Card className={styles.root} variant="outlined">
      <div className={`${styles.logo} ${styles.margin}`}>
        <Logo />
      </div>

      <Typography className={styles.margin} component="h1" variant="h5">
        ログイン
      </Typography>

      {error.has("main") && (
        <Typography className={styles.margin} color="error">
          {error.get("main")}
        </Typography>
      )}

      <label className={`${styles.label} ${styles.margin}`}>
        <Typography>メールアドレス</Typography>
        <TextField
          type="email"
          required
          size="small"
          fullWidth
          variant="outlined"
          inputRef={ref.emailRef}
          error={error.has("email")}
          helperText={error.has("email") ? error.get("email") : ""}
        />
      </label>

      <label className={`${styles.label} ${styles.margin}`}>
        <Typography>パスワード</Typography>
        <TextField
          type="password"
          required
          size="small"
          fullWidth
          variant="outlined"
          inputRef={ref.passwordRef}
          error={error.has("password")}
          helperText={error.has("password") ? error.get("password") : ""}
        />
      </label>

      <div className={styles.margin}>
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={login}
        >
          {loading ? "ログイン中" : "ログイン"}
        </Button>
      </div>

      <div>
        <Button href="/signup" color="primary">
          アカウント作成はこちら
        </Button>
      </div>
      <div>
        <Button href="/forget" color="primary">
          パスワードを忘れた場合はこちら
        </Button>
      </div>
    </Card>
  );
};
