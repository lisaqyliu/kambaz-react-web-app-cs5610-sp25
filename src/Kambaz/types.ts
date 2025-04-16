export interface Course {
  _id?: string;
  name: string;
  description: string;
  image: string;
  startDate?: Date;
  endDate?: Date;
  enrolled?: boolean;
}

export interface KambazState {
  accountReducer: {
    currentUser: {
      role: string;
    };
  };
} 