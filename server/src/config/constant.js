
require('dotenv').config({ path: '../../../.env' });

const constantvar = {
  passwordsaltRound: 10,
  tokenExpiry: process.env.TOKEN_EXPIRY,
  jwtPassphrase: process.env.JWT_PASSPHRASE,
  jwtSecret : process.env.TOKEN_SECRET_KEY,
  tokenSecretKey: process.env.TOKEN_SECRET_KEY,
  resetForgetLink: 'auth/reset-password',
  accountVerificationLink: 'auth/login',

  superAdminResetForgetLink: 'reset-password',

  defaultFileSize: 20,
}

const legalAgreementTypeNumberToName = {
  1: "Privacy Policies",
  2: "Terms & Conditions",
  3: "About Us",
};
const legalAgreementTypeNameToNumber = {
  "Privacy Policies": 1,
  "Terms & Conditions": 2,
  "About Us": 3,
  abc: 4,
};

const planTypeNumberToName = {
  1: 1,
  2: 2,
  3: 3,
};
const planTypeNameToNumber = {
  1: 1,
  2: 2,
  3: 3,
};

const planStatusNumberToName = {
  1: 1,
  2: 2,
};
const planStatusNameToNumber = {
  1: 1,
  2: 2,
};

const userDetailsdietaryPreferenceNumberToName = {
  1: "Vegetraian",
  2: "Non-vegetraian",
};

const userDetailsdietaryPreferenceNameToNumber = {
  " Vegetraian": 1,
  "Non-vegetraian": 2,
};

const userGenderNumberToName = {
  1: "male",
  2: "female",
};

const userGenderNameToNumber = {
  " male": 1,
  " female": 2,
};

const userRoleNumberToName = {
  1: "admin",
  2: "user",
};

const userRoleNameToNumber = {
  " admin": 1,
  " user": 2,
};

module.exports = {
  legalAgreementTypeNameToNumber,
  legalAgreementTypeNumberToName,
  planTypeNameToNumber,
  planTypeNumberToName,
  planStatusNameToNumber,
  planStatusNumberToName,
  userDetailsdietaryPreferenceNameToNumber,
  userDetailsdietaryPreferenceNumberToName,
  userGenderNameToNumber,
  userGenderNumberToName,
  userRoleNameToNumber,
  userRoleNumberToName,
  constantvar,
};
