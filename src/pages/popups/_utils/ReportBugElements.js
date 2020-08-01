import React from 'react'
import Select from 'react-select'
import { useFormik, Field, Form, ErrorMessage, useField } from 'formik'

export class BugAreaSelect extends React.Component {
    handleChange = value => {
        // this is going to call setFieldValue and manually update values.topcis
        this.props.onChange('bugArea', value);
    };

    handleBlur = () => {
        // this is going to call setFieldTouched and manually update touched.topcis
        this.props.onBlur('bugArea', true);
    };

    render() {
        const customStyles = {
            control: (provided, state) => ({
                ...provided,
                border: '1px solid red',
            }),
        }
        return (
            <div>
                <label htmlFor="bugArea">Page<small className='warning'> *</small></label>
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    name="bugArea"
                    options={this.props.options}
                    styles={this.props.style !== null ? customStyles: undefined}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    value={this.props.value}
                    isDisabled={this.props.disabled}
                    placeholder="Select the page"
                    isClearable={true}
                    isSearchable={true}
                />
                <ErrorMessage component="div" className="text-danger" name="bugArea" />
            </div>
        );
    }
}
