export default function TextareInput({ label, name, placeholder, register, required }) {
    let params = { required: false };
    if (required) {
        params.required = true;
    }
    return (
        <>
            <label className="flex mb-1">{label}</label>
            <textarea
                {...register(name, params)}
                placeholder={placeholder}
                className="textarea w-full text-black"
                rows={3}
            />
        </>
    );
}
