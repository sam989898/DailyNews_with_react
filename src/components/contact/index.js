import React from 'react';
import { Formik , Form, Field,   } from 'formik';
import * as Yup from 'yup';
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { sendMessege } from '../../store/actions';
import { showToast } from '../utils/tools'



const Contact = () => {
    const dispatch = useDispatch();
        const formikProps = {
        initialValues:{ email:'', firstname:'',lastname:'',messege:''},
        validationSchema:Yup.object({
            email: Yup.string().required('Sorry, this is rquired').email('Should be an email'),
            firstname: Yup.string().required('Sorry, this is required'),
            lastname: Yup.string().required('Sorry, this is required'),
            messege: Yup.string().required('Sorry, this is required').max(500, 'Sorry messge is too long')
        }),
        onSubmit:( values,{resetForm}) => {
            dispatch(sendMessege(values)).then(({payload})=>{
                if(payload){
                    showToast('SUCCESS',"Thank You, We will contact you back")
                }
                else{
                    showToast('ERROR',"Sorry,Something happened try again")
                }
            })
        },
    }

    const formikInputCustomField =({
        field, //{name, value, onChange,onBlur}
        form: {touched, errors},
        ...props
    }) => (
        <>
        <label htmlFor={field.name}>{props.labelName}</label>
        <input
            type={props.type}
            className="form-control"
            placeholder={props.placeholder}
            {...field}
        />
        
        { errors[field.name] && touched[field.name] ?
            <Alert variant="danger">{errors[field.name]}</Alert>
        :null
        }
    </>
    )

    const formiktextareaCustomField =({
        field, //{name, value, onChange,onBlur}
        form: {touched, errors},
        ...props
    }) => (
        <>
        <label htmlFor={field.name}>{props.labelName}</label>
        <textarea
            type={props.type}
            className="form-control"
            placeholder={props.placeholder}
            rows={props.rows}
            {...field}
        />
        
        { errors[field.name] && touched[field.name] ?
            <Alert variant="danger">{errors[field.name]}</Alert>
        :null
        }</>)

    return(
        <Formik {...formikProps}>
            { formik => (
                <div className="container">
                    <div className="col-md-12 mt-5">
                        <Form>

                            <hr/>
                            <Field
                            name='email'
                            component={formikInputCustomField}
                            placeholder="email"
                            labelName="Please enter your email"
                            type='email'
                            />

                            <hr/>
                            <Field
                            name='firstname'
                            component={formikInputCustomField}
                            placeholder="Firstname"
                            labelName="Enter your Firstname"
                            type='text'
                            />

                            <hr/>
                            <Field
                            name='lastname'
                            component={formikInputCustomField}
                            placeholder="lastname"
                            labelName="Enter your Lastname"
                            type='text'
                            />

                            <hr/>
                           
                            <Field
                            name='messege'
                            component={formiktextareaCustomField}
                            placeholder="Messege"
                            labelName="Messege"
                            type='text'
                            rows='3'/>

                           
                            
                            <hr className="mb-4" />
                            <button className="btn btn-primary btn-lg btn-block" type="submit">
                                Send Messege
                            </button>
                        </Form>
                    </div>
                </div>

            ) }
        </Formik>
       
        
    )

}
            

export default Contact;