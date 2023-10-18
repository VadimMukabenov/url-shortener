import { object, string } from 'yup';

const schema = object({
  long_url: string().required(),
  custom_url: string().min(1).max(7).optional(),
});

export default schema;
