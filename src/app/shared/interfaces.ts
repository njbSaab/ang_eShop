export interface FbResponse{
  name : string
}
export interface FirebaseObject {
  [key: string]: any;
}

export interface Product {
  id?:number
  type?: string
  title?: string
  photo?: string
  info?: string
  price?: number
  date?: any
}

export interface Order {
  id ?:number
  name?: string
  date? : any
  phone?: string
  address?: string
  status?: string
  price?: string
  orders?: any
  title?: string
}
