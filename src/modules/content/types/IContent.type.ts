
interface ICategory {
  _id: string;
  name: string;
  image: string;
  __v: number;
}

interface ITheme {
  _id: string;
  name: string;
  allowsImages: boolean;
  allowsVideos: boolean;
  allowsTexts: boolean;
  __v: number;
}

export interface IContent {
  uuid: string;
  title: string;
  textContent: string;
  url: string;
  category: ICategory;
  theme: ITheme;
}
