import { Config } from '.CONFIG';

interface IUserImageUpload {
  stationId: string;
  userId: string;
  imageUri: string;
}

export const uploadUserImage = async (token, data: IUserImageUpload): Promise<string> => {
  const imagePath = data.imageUri;
  const imageExt = data.imageUri.split('.').pop();
  const imageName = `${data.stationId}.${data.userId}.${imageExt}`;
  const fileBlob = await (await fetch(imagePath)).blob();
  const imageData = new File([fileBlob], imageName);

  let url: any = await fetch(`${Config.AT_API_URI}/util/signed-url?file=${imageName}`, {
    method: 'GET',
  });
  url = await url.json();
  url = url.url;

  await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'image/jpeg',
    },
    body: imageData,
  });

  return imageName;
};
