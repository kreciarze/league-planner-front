export type optionObject = {
    value: number,
    label: string
}
function SelectInput(
    props: {
        title: string,
        items: optionObject[],
        setInputObject: Function,
        value?: number
    }
) {
    const {title, items, setInputObject, value} = props;
  return (
      <>
        <label className="label">
            <span className="label-text">{title}</span>
        </label>
          <select className="select w-full max-w-xs border-2 border-gray-300 focus:outline-none focus:border-purple-500"
                  onChange={
                      (e) => {
                          setInputObject(e.target.value);
                      }
                  } defaultValue={title}>
              <option disabled>{title}</option>
              {items?.map((item) => (
                  <option value={item.value} key={item.value}>{item.label}</option>
              ))}
          </select>
      </>
  )
}

export default SelectInput;