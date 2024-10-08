export function TextFieldForm ({label, name, defaultValue, onChange}) {
    return (
        <div>
            <label htmlFor={name} style={{color: 'white'}}>{label}</label>
            <br />
            <input type="text" name={name} defaultValue={defaultValue} onChange={onChange} style={{color: 'black'}} />
            <br /><br />
        </div>
    )
}
