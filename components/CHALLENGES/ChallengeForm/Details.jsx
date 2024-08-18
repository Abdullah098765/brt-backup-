import { TextInput, TextareaInput, SelectInput } from "../../COMMON/form";
export default function Details({ handleNext, handleBack, register }) {
    return (
        <>
            <TextInput
                label="Challenge Name"
                placeholder="Name"
                name="name"
                register={register}
                required
            />
            <TextareaInput
                label="Challenge Description"
                placeholder="Name"
                name="description"
                register={register}
                required
            />
            <SelectInput
                label="Category"
                name="category"
                register={register}
                required
            />
        </>
    );
}
