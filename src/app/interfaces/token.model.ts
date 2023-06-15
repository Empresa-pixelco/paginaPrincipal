export interface TokenData {
    user: User;
    staff: Staff;
    iat: number;
    exp: number;
  }
  
  interface User {
    aRoles: string[];
    tUpdateAt: Timestamp;
    sUserFirstName: string;
    sUserMail: string;
    bEnable: boolean;
    sUserDni: string;
    tCreateAt: Timestamp;
    sPhone: string;
    _id: string;
  }
  
  interface Staff {
    _id: string;
    sNombre: string;
    lCodSucursal: string;
    bEnable: string;
    sUser: string;
  }
  
  interface Timestamp {
    _seconds: number;
    _nanoseconds: number;
  }
  