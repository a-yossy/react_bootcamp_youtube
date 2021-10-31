import { Button, Card, TextField, Typography } from "@material-ui/core";
import { Logo } from "components/Logo";
import useStyles from "pages/Signup/style";
import { useSignup } from "hooks/Authentication/useSignup";

export const Signup = () => {
  const styles = useStyles();
  const { ref, error, loading, signup } = useSignup();

  return (
    <Card className={styles.root} variant="outlined">
      <div className={`${styles.logo} ${styles.margin}`}>
        <Logo />
      </div>
      <Typography className={styles.margin} component="h1" variant="h5">
        新規アカウント登録
      </Typography>

      {error.has("main") && (
        <Typography className={styles.margin} color="error">
          {error.get("main")}
        </Typography>
      )}

      <label className={`${styles.label} ${styles.margin}`}>
        <Typography>名前</Typography>
        <TextField
          required
          size="small"
          fullWidth
          variant="outlined"
          inputRef={ref.nameRef}
          error={error.has("name")}
          helperText={error.has("name") ? error.get("name") : ""}
        />
      </label>

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
          onClick={signup}
        >
          {loading ? "アカウント作成中" : "新規作成"}
        </Button>
      </div>

      <div>
        <Button href="/login" color="primary">
          ログインはこちら
        </Button>
      </div>
    </Card>
  );
};
