import { body, validationResult } from 'express-validator';
export const registerValidation = [
  body('email').isEmail().withMessage((value, { req }) => req.t('enterValidEmail')),
  body('password').isLength({ min: 6 }),
  body('role').optional().isIn(['admin', 'user']),
  body('userName')
    .notEmpty().withMessage((value, { req }) => req.t('userNameRequired'))
    .withMessage((value, { req }) => req.t('invalidRole')),
  body('city').notEmpty().withMessage((value, { req }) => req.t('cityRequired')),
  body('postalCode').notEmpty().withMessage((value, { req }) => req.t('postalCodeRequired')),
  body('addressLine1').notEmpty().withMessage((value, { req }) => req.t('addressLine1Required')),
  body('addressLine1').optional(),
  body('phoneNumber')
    .notEmpty().withMessage((value, { req }) => req.t('phoneNumberRequired'))
    .matches(/^\+?[0-9]{10,15}$/).withMessage((value, { req }) => req.t('invalidPhoneNumber'))
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req); //това е обект
  if (!errors.isEmpty) {
    return res.status(400).json({ errors: errors.array() })
  };
  next();
}