import { string } from 'yup';

const schema = string().required().min(1).max(7);

export default schema;
