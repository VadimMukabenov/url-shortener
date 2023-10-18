import yup, { Schema as BaseSchema } from 'yup';

const validate = <I extends yup.InferType<S>, S extends BaseSchema>(
    value: I,
    schema: S,
): Promise<boolean> => schema.validate(value);   
  
export default validate;
