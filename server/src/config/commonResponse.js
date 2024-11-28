export const SOMETHING_WRONG = {
  status: 400,
  message: 'Something went wrong',
};

export const NOT_AUTHENTICATED = {
  status: 401,
  message: 'Please login to continue',
};

export const NOT_AUTHORIZED = {
  status: 403,
  message: 'You are not authorized to perform this action',
};

export const USER_NOT_FOUND = {
  status: 404,
  message: 'User not found',
};

export const INVALID_OTP = {
  status: 409,
  message: 'Invalid OTP',
};

export const OTP_EXPIRED = {
  status: 409,
  message: 'OTP expired',
};

export const EMAIL_NOT_FOUND = {
  status: 404,
  message: 'Email not found',
};

export const INVALID_TOKEN = {
  status: 400,
  message: 'Invalid token',
};

export const TOKEN_EXPIRED = {
  status: 400,
  message: 'Token expired',
};

export const INVALID_FILE_TYPE = {
  status: 400,
  message: 'Invalid file type',
};

export const INVALID_FILE_SIZE = {
  status: 400,
  message: 'Invalid file size',
};

export const INVALID_CREDENTIALS = {
  status: 400,
  message: 'Invalid credentials',
};

export const NO_SUBSCRIPTION = {
  status: 404,
  message: 'No subscription found',
};

export const SUBSCRIPTION_NOT_FOUND = {
  status: 404,
  message: 'Subscription not found',
};

export const SUBSCRIPTION_PLAN_NOT_FOUND = {
  status: 404,
  message: 'Subscription plan not found',
};

export const SUBSCRIPTION_PLAN_EXPIRED = {
  status: 409,
  message: 'Subscription plan expired',
};

export const FAILED_TO_CREATE_SUBSCRIPTION = {
  status: 400,
  message: 'Failed to create subscription',
};

export const BAD_REQUEST = {
  status: 400,
  message: 'Bad request',
};

export const EMAIL_ALREADY_EXISTS = {
  status: 409,
  message: 'Email already exists',
};

export const CATEGORY_NOT_FOUND = {
  status: 404,
  message: 'Category not found',
};

export const CATEGORY_USED = {
  status: 409,
  message: 'Category already used',
}

export const PRODUCT_NOT_FOUND = {
  status: 404,
  message: 'Product not found',
};

export const PRODUCT_USED = {
  status: 409,
  message: 'Product already used',
}

export const INVALID_PASSWORD = {
  status: 400,
  message: 'Invalid password',
};

export const INVALID_EMAIL = {
  status: 400,
  message: 'Invalid email',
};

export const INVALID_USERNAME = {
  status: 400,
  message: 'Invalid username',
};

export const USERNAME_ALREADY_EXISTS = {
  status: 409,
  message: 'Username already exists',
};








// usage


// import { USER_NOT_FOUND, BAD_REQUEST } from './commonresponse';

// app.get('/some-route', (req, res) => {
//   if (!user) {
//     return res.status(USER_NOT_FOUND.status).json({ message: USER_NOT_FOUND.message });
//   }
// });
