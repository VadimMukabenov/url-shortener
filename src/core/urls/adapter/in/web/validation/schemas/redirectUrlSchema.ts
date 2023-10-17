import yup from 'yup';

const schema = yup.string().required().min(1).max(7);

export default schema;
