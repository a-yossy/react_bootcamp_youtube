import { Button, CardMedia, Grid, Typography } from "@material-ui/core";
import {
  useState,
  useRef,
  ChangeEvent,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import useStyles from "pages/Upload/VideoSelector/style"

export type VideoSelectProps = {
  videoFile: File | undefined;
  setVideoFile: Dispatch<SetStateAction<File | undefined>>;
  setThumbFile: Dispatch<SetStateAction<File | undefined>>;
};

export const VideoSelect = ({
  videoFile,
  setVideoFile,
  setThumbFile,
}: VideoSelectProps) => {
  const styles = useStyles();
  const [videoURL, setVideoURL] = useState<string>();
  const [thumbnailURLs, setThumbnailURLs] = useState<string[]>([]);
  const [selectThumbURL, setSelectThumbURL] = useState<string>();

  const createThumbnail = (videoRefURL: string) => {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    video.onloadeddata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      video.currentTime = 0;
    };

    video.onseeked = () => {
      if (video.currentTime >= video.duration || !context) return;
      context.drawImage(video, 0, 0);
      setThumbnailURLs((prev) => [...prev, canvas.toDataURL("image/jpeg")]);
      video.currentTime += Math.ceil(video.duration / 3);
    };
    video.src = videoRefURL;
    video.load();
  };

  const selectedThumb = (url: string) => {
    setSelectThumbURL(url);
    fetch(url)
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        const thumb = new File([blob], "thumb.jpeg");
        setThumbFile(thumb);
      });
  };

  const selectedFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files?.length) {
      setVideoFile(event.currentTarget.files[0]);
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    if (videoFile) {
      const videoURL = URL.createObjectURL(videoFile);
      setVideoURL(videoURL);
      createThumbnail(videoURL);
    }
  }, [videoFile]);

  useEffect(() => {
    if (thumbnailURLs.length && thumbnailURLs[0] !== selectThumbURL) {
      selectedThumb(thumbnailURLs[0]);
    }
  }, [thumbnailURLs]);

  return (
    <div className={styles.root}>
      {videoURL && (
        <div className={styles.full}>
          <CardMedia component="video" src={videoURL} controls />
          <Typography className={styles.textPadding}>サムネイル</Typography>
          <Grid container spacing={2} className={styles.thumbnailContent}>
            {thumbnailURLs.map((url) => {
              return (
                <Grid item xs={4}>
                  <CardMedia
                    className={`${styles.thumbnail} ${
                      url === selectThumbURL ? styles.selectedThumb : ""
                    }`}
                    image={url}
                    onClick={() => {
                      selectedThumb(url);
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
      <input type="file" hidden ref={inputRef} onChange={selectedFile}/>

      {!videoURL && (
        <Button
          onClick={handleClick}
          variant="contained"
          color="primary"
        >
          ファイルを選択
        </Button>
      )}
    </div>
  );
};
