import { type Request, type Response, type NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validation = {
    registerValidation: [
        body('name').trim().notEmpty().withMessage('Name is required'),

        body('surName').trim().notEmpty().withMessage('Last name is required'),

        body('phone').trim().notEmpty().withMessage('Phone is required'),

        body('email').trim().notEmpty().withMessage('Email is required').isEmail()
            .withMessage('Invalid email'),

        body('password').trim().notEmpty().withMessage('Password is required'),

        body('password')
            .isLength({ min: 6, max: 12 }).withMessage('The password must be longer than 6 characters')
            .matches(/^(?=.*[A-Za-zА-Яа-я])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-zА-Яа-я\d@$!%*#?&]{8,}$/)
            .withMessage('The password must contain at least one letter, one digit, and one special character (@$!%*#?&)'),
    ],

    loginValidation: [
        body('email').trim().notEmpty().withMessage('Email is required').isEmail()
            .withMessage('Invalid email'),

        body('password').trim().notEmpty().withMessage('Password is required'),

        body('role').notEmpty().withMessage('You need to select a role to determine how you want to login')
    ],

    loginSendSmsValidation: [
        body('phone').trim().notEmpty().withMessage('Phone required to login'),
    ],

    loginVerifySmsValidation: [
        body('validCode').trim().notEmpty().withMessage('The code required to login'),
    ],

    updateUserNameValidation: [
        body('name').trim().notEmpty().withMessage('Name is required'),
    ],

    updateUserSurNameValidation: [
        body('surName').trim().notEmpty().withMessage('Last name is required'),
    ],

    updateUserPhoneValidation: [
        body('phone').trim().notEmpty().withMessage('Phone is required'),
    ],

    updateUserEmailValidation: [
        body('email').trim().notEmpty().withMessage('Email is required').isEmail()
            .withMessage('Invalid email'),
    ],

    updateUserPasswordValidation: [
        body('oldPassword').trim().notEmpty().withMessage('OldPassword required to update password'),

        body('newPassword')
            .isLength({ min: 6, max: 12 }).withMessage('The password must be longer than 6 characters')
            .matches(/^(?=.*[A-Za-zА-Яа-я])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-zА-Яа-я\d@$!%*#?&]{8,}$/)
            .withMessage('The password must contain at least one letter, one digit, and one special character (@$!%*#?&)'),
    ],

    createProductValidation: [
        body('title').trim().notEmpty().withMessage('Title is required'),

        body('collection').isObject().withMessage('Collection must be an object'),

        body('collection.name').isString().notEmpty().withMessage('Collection name is required'),

        body('collection.season').isString().notEmpty().withMessage('Season is required'),

        body('collection.condition').isString().notEmpty().withMessage('Condition is required'),

        body('category').trim().notEmpty().withMessage('Category is required'),

        body('material').trim().notEmpty().withMessage('Material is required'),

        body('gender').trim().notEmpty().withMessage('Gender is required'),

        body('sku').trim().notEmpty().withMessage('SKU is required'),

        body('price').notEmpty().withMessage('Price is required')
            .isNumeric().withMessage('Price must be a number'),

        body('description').trim().notEmpty().withMessage('Description is required'),

        body('colors').isArray().withMessage('Colors must be an array')
            .notEmpty().withMessage('Colors are required'),

        body('sizes').isArray().withMessage('Sizes must be an array')
            .notEmpty().withMessage('Sizes are required'),

        body('variants').isArray().withMessage('Variants must be an array')
            .notEmpty().withMessage('Variants are required'),
    ],

    addProductToCartValidation: [
        body('colors').isArray().withMessage('The color of the pillar should be substantial'),

        body('colors.*.hex').isString().notEmpty().withMessage('Hex is mandatory'),

        body('colors.*.colorName').isString().notEmpty().withMessage('ColorName is required'),

        body('sizes').trim().notEmpty().withMessage('Size required to adding product to cart'),
    ],

    addAddressValidation: [
        body('email').trim().notEmpty().withMessage('Email is required'),

        body('phone').trim().notEmpty().withMessage('Phone is required'),

        body('firstName').trim().notEmpty().withMessage('First name is required'),

        body('lastName').trim().notEmpty().withMessage('Last name is required'),

        body('country').trim().notEmpty().withMessage('Country is required'),

        body('stateRegion').trim().notEmpty().withMessage('State or region is required'),

        body('address').trim().notEmpty().withMessage('Address is required'),

        body('city').trim().notEmpty().withMessage('City is required'),

        body('postalCode').trim().notEmpty().withMessage('Postal code is required'),
    ],

    shippingValidation: [
        body('delivery').trim().notEmpty().withMessage('Shipping Method Code required to order'),
    ],

    paymentValidation: [
        body('paymentMethod').trim().notEmpty().withMessage('Select a payment method')
            .isIn(['card', 'apple', 'google', 'paypal']).withMessage('Invalid payment method'),

        body('cardNumber').if(body('paymentMethod').equals('card')).trim()
            .notEmpty().withMessage('Enter the card number'),

        body('expiryDate').if(body('paymentMethod').equals('card'))
            .notEmpty().withMessage('Enter the card\'s expiration date'),

        body('cardCvv').if(body('paymentMethod').equals('card')).trim()
            .notEmpty().withMessage('Enter the card cvv')
            .isLength({ min: 3, max: 4 }).withMessage('Enter the card cvv')
    ],

    replaceOrderValidation: [
        body('cause_replace').trim().notEmpty().withMessage('Select a reason for cancellation'),
    ],

    handleValidationErrors (req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const formattedErrors: Record<string, string> = {};

            errors.array().forEach(err => {
                if('path' in err){
                    formattedErrors[err.path] = err.msg;
                }
            });

            console.log(errors);

            return res.status(400).json({
                message: 'Ошибка валидации данных',
                errors: formattedErrors
            });
        }
        return next();
    }
};