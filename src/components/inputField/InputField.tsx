import {useEffect} from "react";

function InputField(
    props: {
        type: string,
        placeholder: string,
        onChange: Function,
        required: boolean,
        label: string,
        value?: string | number
    }
) {
    const {type, placeholder, onChange, required, label, value } = props;

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <input type={type} placeholder={placeholder} className="input input-bordered" required={required}
                   onChange={
                       (e) => {
                           onChange(e.target.value);
                       }
                   } value={value ?? ""}/>
        </div>
    )
}

export default InputField;