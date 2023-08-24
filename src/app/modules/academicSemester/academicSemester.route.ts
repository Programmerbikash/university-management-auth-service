import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterZodValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.Controller';
const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterZodValidation.academicSemesterZodSchema),
  AcademicSemesterController.createSemester
);

export const AcademicSemesterRoutes = router;
