import * as Yup from 'yup';

const validationSchema = Yup.object({
    dropdownValue: Yup.string().required('Please select an option'),
    inputText: Yup.string().required('Please enter some text'),
    textAreaValue: Yup.string().required('Please enter some text'),
    picture: Yup.mixed()
      .required('Please upload a picture')
      .test('fileSize', 'File size is too large', (value) => {
        if (value) {
          return value.size <= 5000000; // 5MB
        }
        return true;
      })
      .test('fileType', 'Unsupported file format', (value) => {
        if (value) {
          return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
        }
        return true;
      }),
    url: Yup.string().url('Please enter a valid URL').required('Please enter a URL'),
  });

  export default validationSchema