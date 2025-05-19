export interface IProject extends Document {
   clientName: string;
    sellsBy: string; 
    orderStartDate: string;
    assignedBy: string; 
    assignedTeam: string[]; 
    leadBy: string; 
    deliveryDate: string;
    platfrom: "Fiverr"| "Upwork"
    marketingProfile: string;
    projectStatus: 'NRI' | 'WIP' | 'Hold' | 'Cancel'; 
    orderSheet: string;
    specialNote: string;
  }