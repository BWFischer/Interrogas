import * as Yup from 'yup';

const FormSchema = Yup.object().shape({
    pollsterId: Yup.number()
        .min(1, 'Id Must Have At Least 1 Characters')
        .max(999, 'Name Must Be Less Than 999 Characters'),

    name: Yup.string()
        .min(2, 'Name Must Have At Least 2 Characters')
        .max(255, 'Name Must Be Less Than 255 Characters')
        .required('This is a Required Field'),

    logoUrl: Yup.string()
        .min(9, 'URL Must Be More Than 8 Characters')
        .max(255, 'URL Must Be Less Than 255 Characters')
        .required('This is a Required Field'),

    siteUrl: Yup.string()
        .min(9, 'URL Must Be More Than 8 Characters')
        .max(255, 'URL Must Be Less Than 255 Characters')
        .required('This is a Required Field'),

    location: Yup.string()
        .min(2, 'Location Must Have At Least 2 Characters')
        .max(200, 'Location Must Be Less Than 200 Characters')
        .required('This is a Required Field'),
});

export default FormSchema;
