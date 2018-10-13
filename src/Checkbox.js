import React, {Component} from 'react';
import {Form, Checkbox} from 'semantic-ui-react';
import {Field} from 'formik';
import {InputRef} from './InputRef';

class FormikCheckbox extends Component {
  constructor(props) {
    super(props);
    const {id, name} = props;
    this.id = id || `field_checkbox_${name}`;
  }

  render() {
    const {
      name,
      label,
      inputProps = {},
      fieldProps = {},
      inputRef,
    } = this.props;
    const {onChange, ...safeInputProps} = inputProps;
    return (
      <Field
        name={name}
        render={({field, form}) => {
          const error = form.touched[name] && form.errors[name];
          return (
            <Form.Field error={!!error} {...fieldProps}>
              <InputRef inputRef={inputRef}>
                <Checkbox
                  {...safeInputProps}
                  id={this.id}
                  label={label}
                  name={name}
                  checked={field.value}
                  onChange={(e, {name, checked}) => {
                    form.setFieldValue(name, checked, true);
                    onChange && onChange(e, {name, value: checked});
                  }}
                />
              </InputRef>
              {error && (
                <span className="sui-error-message">{form.errors[name]}</span>
              )}
            </Form.Field>
          );
        }}
      />
    );
  }
}

export default FormikCheckbox;
