import { Card, CardHeader, CardMedia } from "@material-ui/core";
import { useEffect, useState } from "react";
import { HeaderTitle, HeaderTitleProps } from "components/VideoCard/HeaderTitle";
import { SubHeaderContent, SubHeaderContentProps } from "components/VideoCard/SubHeaderContent";
import useStyles from "components/VideoHorizontalCard/style"

export type VideoHorizontalCardProps = {
  fetcher: () => Promise<string | undefined>;
} & HeaderTitleProps &
  SubHeaderContentProps;

export const VideoHorizontalCard = ({
  title,
  owner,
  views,
  created,
  fetcher,
}: VideoHorizontalCardProps) => {
  const styles = useStyles();

  const [src, setSrc] = useState<string>();

  useEffect(() => {
    fetcher().then(setSrc);
  });

  return (
    <Card
      className={`${styles.root} ${styles.transparent}`}
      elevation={0}
      square
    >
      <div className={styles.thumbnail}>
        <CardMedia
          className={styles.media}
          image={src}
          title="Thumbnail"
        />
      </div>

      <CardHeader
        className={styles.contentPadding}
        title={<HeaderTitle title={title} />}
        subheader={<SubHeaderContent owner={owner} views={views} created={created} />}
      />
    </Card>
  );
};
