import { Formik, Form, Field } from 'formik';
import css from './SearchMovie.module.css';

export default function SearchMovie({ onSubmit }) {
  const initialValues = {
    query: '',
  };
  const hendelSubmit = ({ query }, helpers) => {
    if (query.trim() === '') {
      console.log('search name muvie');
      return;
    }
    onSubmit(query);
    helpers.resetForm();
  };
  return (
    <>
      <Formik initialValues={initialValues} onSubmit={hendelSubmit}>
        <Form className={css.form}>
          <Field
            name="query"
            type="text"
            autoFocus
            placeholder="Search muvie"
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </>
  );
}
