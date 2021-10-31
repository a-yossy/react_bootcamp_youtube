import { Avatar, Card, CardHeader, CardMedia } from "@material-ui/core";
import { HeaderTitle, HeaderTitleProps } from "./HeaderTitle";
import { SubHeaderContent, SubHeaderContentProps } from "./SubHeaderContent";
import useStyles from "components/VideoCard/style";
import { useEffect, useState } from "react";

export type ViderCardProps = {
  fetcher: () => Promise<string | undefined>;
} & HeaderTitleProps &
  SubHeaderContentProps;

export const VideoCard = ({
  fetcher,
  title,
  owner,
  created,
  views,
}: ViderCardProps) => {
  const styles = useStyles();
  const [imageSrc, setImageSrc] = useState<string>();

  useEffect(() => {
    fetcher().then(setImageSrc);
  });

  return (
    <Card className={styles.root} elevation={0} square>
      <CardMedia
        className={styles.media}
        image={imageSrc || "/static/no-image.jpg"}
        title="Thumbnail"
      />

      <CardHeader
        className={styles.header}
        avatar={<Avatar />}
        title={<HeaderTitle title={title} />}
        subheader={<SubHeaderContent owner={owner} views={views} created={created} />}
      />
    </Card>
  );
};
