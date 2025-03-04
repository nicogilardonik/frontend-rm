export interface ICompany {
  id: string;
  name: string;
  description: string;
  phone_number: string;
  website: string;
  employee_count: number;
  industry: string;
  owner: IOwner;
  collaborators: ICollaborators[];
  logo_url: string;
  primaryColor: string;
}

interface IOwner {
  _firestore: {
    projectId: string;
  };
  _path: {
    segments: string[];
  };
  _converter: any;
}

interface ICollaborators {
  _firestore: {
    projectId: string;
  };
  _path: {
    segments: string[];
  };
  _converter: any;
}
