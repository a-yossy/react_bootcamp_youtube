import { useEffect, useState } from "react";
import { storage } from "utils/Firebase/config";
import { v4 as uuidv4 } from "uuid";
import { useInsertVideoMutation } from "utils/graphql/generated";
import { useRecoilValue } from "recoil";
import { GlobalUser } from "stores/User";

type UploadProps = {
  file: {
    thumbnail: File;
    video: File;
  };
  title: string;
  description?: string;
  ownerId: string;
};

export const useVideoUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [mutation, { error: apolloError }] = useInsertVideoMutation();
  const user = useRecoilValue(GlobalUser);

  const uploadStorage = (id: string, file: File, path: string) => {
    const exe = file.name.split(".").pop();
    return storage.ref(`${path}/${id}.${exe}`).put(file);
  };

  const upload = async ({ file, title, description, ownerId }: UploadProps) => {
    if (!user?.id) {
      return;
    }

    setLoading(true);
    const videoName = uuidv4();
    const thumbName = uuidv4();
    const videoId = uuidv4();

    try {
      const videoUploadTask = await uploadStorage(
        videoName,
        file.video,
        "videos"
      );

      const thumbnailUploadTask = await uploadStorage(
        thumbName,
        file.thumbnail,
        "thumbnails"
      );

      const res = await mutation({
        variables: {
          id: videoId,
          title,
          description,
          video_url: videoUploadTask.ref.fullPath,
          thumbnail_url: thumbnailUploadTask.ref.fullPath,
          owner_id: ownerId,
        },
      });

      return res.data?.insert_videos_one;

    } catch(error) {
      console.log(error);
      setError(new Error("エラーが発生しました。最初からやり直してください。"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (apolloError) {
      console.error(apolloError);
      setError(new Error("エラーが発生しました。最初からやり直してください。"));
    }
  }, [apolloError]);

  return {
    upload,
    loading,
    error,
  };
};
