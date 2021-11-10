import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [handle, setHandle] = useState("");
    const handleSelect = event => {
      console.log(event.target.value)
        setHandle(event.target.value);
    }
  const userTypes = [
      {
        value: '',
        label: 'Select One',
      },
    {
      value: 'ADMIN',
      label: 'ADMIN',
    },
    {
      value: 'TEACHER',
      label: 'TEACHER',
    },
    {
      value: 'GUEST',
      label: 'GUEST',
    },
  ];

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    phoneNumber: Yup.string().required('Phone Number is Required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      userType: '',
      phoneNumber: '',
      password: '',
      active: true,
    },
    validationSchema: RegisterSchema,
    onSubmit: (event) => {
      console.log("Submit Form" ,JSON.stringify(event))
      Axios.post('http://localhost:8082/register',event)
      .then(response =>{
        console.log(JSON.stringify(response))
        const resp = response.data;
        navigate('/login', { replace: true });
      });
      // Axios.get('http://localhost:8082/login')
      // .then(response =>{
      //   if(response.status === 200){
      //     navigate('/login', { replace: true });
      //   }else {
      //     console.log("Error Registering User")
      //   }
      //   console.log(JSON.stringify(response))
      // });
      
    }
  });


  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="phonenumber"
            type="phone"
            label="Phone Number"
            {...getFieldProps('phoneNumber')}
            error={Boolean(touched.phoneNumber && errors.phoneNumber)}
            helperText={touched.phoneNumber && errors.phoneNumber}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

        <TextField
          id="filled-select-currency"
          select
          label="Select"
          value={formik.userType}
          helperText="Please select your User Type"
          onChange={formik.handleChange}
          SelectProps={{
            native: true,
          }}
          {...getFieldProps('userType')}
        >
          {userTypes.map((option) => (
         <option key={option.value} value={option.value}> 
          {option.label}
           </option>
          ))}
          </TextField>


          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
