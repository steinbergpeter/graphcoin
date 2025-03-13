// import { CryptoApiResponseSchema, scatterApiResponseSchema } from './schemas';
import { type ZodSchema } from 'zod';

// const validateCryptoData = (apiData: unknown) => {
//   const validationResult = CryptoApiResponseSchema.safeParse(apiData);

//   if (!validationResult.success) {
//     const errorMessages = validationResult.error.errors
//       .map((err) => `${err.path.join('.')}: ${err.message}`)
//       .join('\n');
//     throw new Error(`Validation failed:\n${errorMessages}`);
//   }

//   return validationResult.data;
// };

// const validateScatterData = (apiData: unknown) => {
//   const validationResult = scatterApiResponseSchema.safeParse(apiData);

//   if (!validationResult.success) {
//     const errorMessages = validationResult.error.errors
//       .map((err) => `${err.path.join('.')}: ${err.message}`)
//       .join('\n');
//     throw new Error(`Validation failed:\n${errorMessages}`);
//   }

//   return validationResult.data;
// };

const validator = (apiData: unknown, schema: ZodSchema) => {
  if (!schema) throw new Error('Schema is required');
  const validationResult = schema.safeParse(apiData);
  if (!validationResult.success) {
    const errorMessages = validationResult.error.errors
      .map((err) => `${err.path.join('.')}: ${err.message}`)
      .join('\n');
    throw new Error(`Validation failed:\n${errorMessages}`);
  }
  return validationResult.data;
};

export {
  // validateCryptoData,
  // validateScatterData,
  validator,
};
