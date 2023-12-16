import {Match} from "@/types/types";

export type optionObject = {
    value: number,
    label: string
}
function SelectInput(
    props: {
        title: string,
        items: optionObject[],
        setInputObject: Function,
    }
) {
    const {title, items, setInputObject} = props;
  return (
      <>
        <label className="label">
            <span className="label-text">{title}</span>
        </label>
          <select className="select w-full max-w-xs border-2 border-gray-300 focus:outline-none focus:border-purple-500"
                  onChange={
                      (e) => {
                          setInputObject((prev: optionObject) => {
                              return {
                                  label: prev.label,
                                  value: parseInt(e.target.value)
                              }
                          })
                      }
                  }>
              <option disabled>{title}</option>
              {items?.map((item) => (
                  <option value={item.value} key={item.value}>{item.label}</option>
              ))}
          </select>
      </>
  )
}

export default SelectInput;