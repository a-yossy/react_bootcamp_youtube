import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import { VideoSelect } from "pages/Upload/VideoSelector";
import { UploadForm } from "pages/Upload/UploadForm";
import useStyles from "pages/Upload/style";
import { useRecoilValue } from "recoil";
import { AccountLoaded } from "stores/AccountLoaded";
import { useEffect, useState } from "react";
import { GlobalUser } from "stores/User";
import { useNavigate } from "react-router-dom";

export const Upload = () => {
  const styles = useStyles();

  const accountLoaded = useRecoilValue(AccountLoaded);
  const user = useRecoilValue(GlobalUser);

  const [videoFile, setVideoFile] = useState<File>();
  const [thumbFile, setThumbFile] = useState<File>();

  const navigate = useNavigate();

  useEffect(() => {
    if (accountLoaded) {
      if (!user?.id) {
        navigate("/login");
      }
    }
  }, [accountLoaded, user?.id]);

  return (
    <Dialog fullWidth={true} maxWidth="md" open={true}>
      <DialogTitle>動画のアップロード</DialogTitle>
      <Divider />
      <DialogContent className={styles.body}>
        {user?.id ? (
          <Grid container spacing={4}>
            <Grid xs item>
              <VideoSelect
                videoFile={videoFile}
                setVideoFile={setVideoFile}
                setThumbFile={setThumbFile}
              />
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid xs item>
              <UploadForm
                videoFile={videoFile}
                thumbFile={thumbFile}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid container justifyContent="center">
            <CircularProgress size={50} />
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};
