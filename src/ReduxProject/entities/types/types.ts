export interface AuthState {
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
  }
  
 export interface Credentials {
    login: string;
    password: string;
  }

  export interface DataItem {
    id: number;
    name: string;
    status: string;
    date_created: string;
    price: number;
    category: string;
  }
  
  export interface DataState {
    items: DataItem[];
    loading: boolean;
    saving: boolean;
    error: string | null;
  }