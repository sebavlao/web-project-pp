export const Input = ({labelName, handle, ...props }) => (
    <li className="flex flex-col gap-1">
        <label>{ labelName }</label>
        <input onChange={handle} className="text-white bg-zinc-700 p-2 rounded-md truncate" {...props}></input>
    </li>
)