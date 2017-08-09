import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostNew extends Component {

    renderTitleField(field) {
        return (
            <div>
                <input
                    type="text"
                    //Wire all event handlers and properties as props
                    {...field.input}
                />
            </div>
        )
    }

    render() {
        return (
            <form>
                <Field
                    name="title"
                    component={this.renderTitleField} />
            </form>
        );
    }
}

export default reduxForm({
    //What form you inject to redux, name must be unique
    form: 'PostsNewForm'
})(PostNew);