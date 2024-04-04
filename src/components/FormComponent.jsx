import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FileParser } from '../utils/fileParser';

const VALID_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

function FormComponent() {
    const KB = 1024;
    const MB = 1024 * KB;

    // Yup schema for form validation
    const validationSchema = yup.object().shape({
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last name is required'),
        email: yup.string().email('Invalid email address').required('Email is required'),
        password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        gender: yup.string().required('Gender is required'),
        image: yup.mixed().test('fileType', 'Invalid file type', value => {
            if (!value) return true; // Allow empty file
            return VALID_TYPES.includes(value.type);
        }),
        dateBirth: yup.date().required('Date of birth is required'),
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            gender: '',
            image: '',
            dateBirth: '',
        },
        onSubmit: (values) => {
            FileParser(values.image)
            .then((res )=> console.log(res))
            .catch((err) => console.log(err))
            formik.resetForm();
        },
        validationSchema: validationSchema, // Provide validation schema to Formik
    });

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            // Parse the file
            try {
                const parsedFile = await FileParser(file);
                console.log(parsedFile);
                formik.setFieldValue('image', parsedFile); // Set parsed file to formik values
            } catch (error) {
                console.error('Error parsing file:', error);
            }
        }
    };

    return (
        <form onSubmit={formik.handleSubmit} className='mx-auto text-white'>
            {/* First name */}
            <div className='gap-1'>
                <label htmlFor='firstname'>First name</label><br />
                <input
                    id='firstname'
                    type='text'
                    placeholder='Insert firstname'
                    name='firstName'
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='px-4 py-2 outline-none rounded-lg'
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                    <div className='text-red-500'>{formik.errors.firstName}</div>
                ) : null}
            </div>

            {/* Last name */}
            <div>
                <label htmlFor='lastname'>Last name</label><br />
                <input
                    id='lastname'
                    type='text'
                    placeholder='Insert lastname'
                    name='lastName'
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='px-4 py-2 outline-none rounded-lg'
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                    <div className='text-red-500'>{formik.errors.lastName}</div>
                ) : null}
            </div>

            {/* Email */}
            <div>
                <label htmlFor='email'>Email</label><br />
                <input
                    id='email'
                    type='text'
                    placeholder='Insert email'
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='px-4 py-2 outline-none rounded-lg'
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className='text-red-500'>{formik.errors.email}</div>
                ) : null}
            </div>

            {/* Password */}
            <div>
                <label htmlFor='password'>Password</label><br />
                <input
                    id='password'
                    type='password'
                    placeholder='Insert password'
                    name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='px-4 py-2 outline-none rounded-lg text-black'
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className='text-red-500'>{formik.errors.password}</div>
                ) : null}
            </div>

            {/* Gender */}
            <div className=' text-white'>
                <label htmlFor='gender'>Gender</label><br />
                <select
                    id='gender'
                    name='gender'
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='text-black outline-none px-4 py-2 rounded-lg'
                >
                    <option value=''>Select</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </select>
                {formik.touched.gender && formik.errors.gender ? (
                    <div className='text-red-500'>{formik.errors.gender}</div>
                ) : null}
            </div>

            {/* Image */}
            <div>
                <label htmlFor='image'>Image</label><br />
                <input
                    id='image'
                    type='file'
                    accept='image/jpeg, image/png'
                    onChange={handleImageChange}
                    onBlur={formik.handleBlur}
                    className='rounded-l-lg w-80'
                />
                {formik.touched.image && formik.errors.image ? (
                    <div className='text-red-500'>{formik.errors.image}</div>
                ) : null}
            </div>

            {/* Date of Birth */}
            <div>
                <label htmlFor='dateBirth'>Date of birth</label><br />
                <input
                    id='dateBirth'
                    type='date'
                    placeholder='Insert date'
                    name='dateBirth'
                    value={formik.values.dateBirth}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='px-4 py-2 outline-none rounded-lg text-black'
                />
                {formik.touched.dateBirth && formik.errors.dateBirth ? (
                    <div className='text-red-500'>{formik.errors.dateBirth}</div>
                ) : null}
            </div>

            {/* registration */}
            <button className='my-4  px-4 h-10 rounded-lg bg-orange-600' type='submit'>Register</button>
            
        </form>
    );
}

export default FormComponent;
