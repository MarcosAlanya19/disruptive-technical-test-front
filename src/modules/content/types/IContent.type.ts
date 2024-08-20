export enum EContentType {
  IMAGE = 'Image',
  VIDEO = 'Video',
  TEXT = 'Text'
}

export interface IContent {
  title: string;
  textContent: string,
  url: string
  type: EContentType,
  credits: string,
}
