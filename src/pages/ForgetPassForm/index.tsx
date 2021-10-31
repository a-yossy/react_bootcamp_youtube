import { Button, Card, TextField, Typography } from "@material-ui/core";
import { useForgetPass } from "hooks/Authentication/useForgetPass";
import useStyles from "pages/ForgetPassForm/style";

export const ForgetPassForm = () => {
  const styles = useStyles();
  const { ref, sendEmail, sendSuccess, loading, error } = useForgetPass();

  return (
    <Card className={styles.root} variant="outlined">
      <Typography className={styles.margin} component="h1" variant="h5">
        パスワードの再発行
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

      {sendSuccess && (
        <Typography className={styles.margin} color="primary">
          ✔︎メールの送信が完了しました。
        </Typography>
      )}

      <div className={styles.margin}>
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={sendEmail}
        >
          {loading ? "メールを送信中" : "再発行メールを送信"}
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
