export interface TFormUsers {
  id: number;
  name: string;
  email: string;
  level: string;
  image_profile: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}

export interface TFormUser extends TFormUsers {}
