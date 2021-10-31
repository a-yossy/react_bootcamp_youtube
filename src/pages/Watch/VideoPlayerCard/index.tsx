import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import useStyles from "pages/Watch/VideoPlayerCard/style"

export type VideoPlayerCardProps = {
  title: string | undefined;
  description: string | undefined;
  views: number | undefined;
  ownerName: string | undefined;
  date: Date | undefined;
  fetcher: () => Promise<string | undefined>;
};

export const VideoPlayerCard = ({
  title,
  description,
  views,
  ownerName,
  date,
  fetcher,
}: VideoPlayerCardProps) => {
  const styles = useStyles();

  const [src, setSrc] = useState<string>();

  useEffect(() => {
    fetcher().then(setSrc);
  });

  return (
    <Card className={styles.transparent} elevation={0} square>
      <CardMedia
        component="video"
        controls
        src={src}
      />

      <CardContent className={styles.paddingHorizontalLess}>
        <Typography component="h2" variant="h6">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {views} 回視聴 • {date ? new Date(date).toLocaleDateString() : ""}
        </Typography>
      </CardContent>

      <Divider />

      <CardHeader
        className={styles.paddingHorizontalLess}
        avatar={<Avatar />}
        title={ownerName}
        subheader="0 subscribers"
      />

      <CardContent className={styles.descPadding}>
        {description}
      </CardContent>
    </Card>
  );
};
