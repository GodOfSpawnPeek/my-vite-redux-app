export type Project = {
  id: string;
  title: string;
  description?: string;
  links: string[];
  previewImage?: string;
};

export type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  role: string;
  description?: string;
  workplace?: string;
  portfolio: Project[];
}; 