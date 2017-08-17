import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostNew extends Component {

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form group ${touched && error ? 'has-danger' : ''}`;
        return (
            //Display all the errors only if the component was touched
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className='form-control'
                    type="text"
                    //Wire all event handlers and properties as props
                    {...field.input}
                />
                <div className='text-help'>
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            //handleSubmit is called if the form has no errors
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    name="title"
                    label="Title"
                    component={this.renderField} />
                <Field
                    name="categories"
                    label="Categories"
                    component={this.renderField} />
                <Field
                    name="content"
                    label="Post Content"
                    component={this.renderField} />

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>

            </form>
        );
    }
}

function validate(values) {
    const errors = {};
    //properties must be equal to the name of the field components
    //validate the inputs from 'values'
    if (!values.title || values.title.length < 3) {
        errors.title = "Enter a title which is at least 3 characters!";
    }
    if (!values.categories) {
        errors.categories = "Enter a categorie!";
    }
    if (!values.content) {
        errors.content = "Enter a content!";
    }
    //if errros is empty the form has no errors, if any the form will not be send
    return errors;
}

export default reduxForm({
    //What form you inject to redux, name must be unique
    validate,
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostNew) //wire a connected version of POSTNEW
    );