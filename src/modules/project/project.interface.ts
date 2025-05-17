export interface IProject extends Document {
   clientName: string;
    sellsBy: string; 
    orderStartDate: string;
    assignedBy: string; 
    assignedTeam: string[]; 
    leadBy: string; 
    deliveryDate: string;
    platfrom: string;
    marketingProfile: string;
    projectStatus: 'pending' | 'in_progress' | 'completed' | 'on_hold'; 
    orderSheet: string;
    specialNote: string;
  }