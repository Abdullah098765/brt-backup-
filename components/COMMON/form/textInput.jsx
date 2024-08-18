export default function TextInput({ label, name, placeholder, register, required }) {
    let params = { required: false };
    if (required) {
        params.required = true;
    }
    return (
        <>
            <label className="flex mb-1">
                {label} <span>*</span>
            </label>
            <input
                {...register(name, params)}
                placeholder={placeholder}
                className="input w-full input-bordered text-black"
            />
        </>
    );
}
