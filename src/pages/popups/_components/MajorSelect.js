import React from 'react'
import Select from 'react-select'
import { ErrorMessage } from 'formik'

class MajorSelect extends React.Component {
    handleChange = value => {
        // this is going to call setFieldValue and manually update values.topcis
        this.props.onChange('major', value);
    };

    handleBlur = () => {
        // this is going to call setFieldTouched and manually update touched.topcis
        this.props.onBlur('major', true);
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
                <label htmlFor="major">Major<small className='text-danger'> *</small></label>
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    name="major"
                    options={this.props.options}
                    styles={this.props.style !== null ? customStyles: undefined}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    value={this.props.value}
                    isDisabled={this.props.disabled}
                    placeholder="Select major"
                    isClearable={true}
                    isSearchable={true}
                />
                <ErrorMessage component="div" className="text-danger" name="major" />
            </div>
        );
    }
}

export default MajorSelect