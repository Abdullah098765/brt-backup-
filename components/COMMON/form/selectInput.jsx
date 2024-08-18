export default function SelectInput({ label, name, register, required }) {
    let params = { required: false };
    if (required) {
        params.required = true;
    }
    let options = ["Game", "Gym", "Cartoon"];
    return (
        <>
            <label className="flex mb-1">{label}</label>
            <select
                className="select w-full"
                name={name}
                {...register(name, params)}>
                <option
                    disabled
                    selected>
                    Choose
                </option>
                {options.map((option) => (
                    <option value={option}>{option}</option>
                ))}
            </select>
        </>
    );
}
