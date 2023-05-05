import { Response } from 'express';

export const successResponse = <T>(res: Response, data: T) => res.status(200).json(data);
export const badRequestResponse = (res: Response, errorCode = 'Bad Request') => res.status(400).json({ errorCode });
export const unauthorizedResponse = (res: Response, errorCode = 'Unauthorized') => res.status(401).json({ errorCode });
export const forbiddenResponse = (res: Response, errorCode = 'Forbidden') => res.status(403).json({ errorCode });
export const notFoundResponse = (res: Response, errorCode = 'Not Found') => res.status(404).json({ errorCode });
export const errorResponse = (res: Response, errorCode = 'Failed') => res.status(500).json({ errorCode });
