const { body } =  require('express-validator');


const registerValidationRules = () => [
  body("nombreSuperHeroe")
    .trim()
    .notEmpty()
    .withMessage("No puede estar vacio")
    .isLength({ min: 3, max: 60 })
    .withMessage("Longitud minima de 3 caracteres y maxima de 60 caracteres"),
  body("nombreReal")
    .trim()
    .notEmpty()
    .withMessage("No puede estar vacio")
    .isLength({ min: 3, max: 60 })
    .withMessage("Longitud minima de 3 caracteres y maxima de 60 caracteres"),
  body("edad")
    .exists()
    .isNumeric()
    .withMessage("Debe ser un numero")
    .trim()
    .notEmpty()
    .withMessage("No puede estar vacio")
    .isInt({ min: 0 })
    .withMessage("No admite edad negativa"),
  body("poderes")
    .isArray({ min: 1 })
    .withMessage("Debe tener al menos 1 poder"),
  body("poderes.*")
    .isString()
    .notEmpty()
    .withMessage("No puede estar vacio")
    .isLength({ min: 3, max: 60 })
    .withMessage("Cada poder debe tener entre 3 y 60 caracteres") 
    .matches(/^\S+$/) //verifica que sea un Array y que no este vacio
    .withMessage("Cada poder no debe contener espacios en blanco"),
];

module.exports = { registerValidationRules }