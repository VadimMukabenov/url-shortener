import { object, string } from 'yup';

const schema = object({
  long_url: string().required(),
  custom_url: string().optional(),
});

export default schema;
