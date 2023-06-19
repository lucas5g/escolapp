import { NextFunction, Request, Response } from "express";



export function permission(...profiles: ('coordinator' | 'manager' | 'judge')[]) {

  return function (req: Request, res: Response, next: NextFunction) {

    if(req.user.profile === 'manager'){
      return next()
    }

    const haveProfile = profiles.some(profile => profile === req.user.profile)
   
    if (!haveProfile) {
      return res.status(401).json({ message: 'Sem permissão' })
    }
    next()
  }
}


