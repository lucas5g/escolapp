declare namespace Express {
  interface Request {
    user: {
      id: number
      name: string 
      email: string
      profile: manager | judge | coordinator | representative
      unityId: number
    };
  }
}

