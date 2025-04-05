export interface IProcessingPost {
  num1: number,
  num2: number,
  num3: number,
}
export interface IProcessing extends IProcessingPost {
  id: number,
  average?: number,
  median?: number,
  status: string
}
