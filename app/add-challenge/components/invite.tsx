import { useEffect, useMemo, useState } from "react";
import { useChallengeCreate } from "../../../state/useChallengeForm";
import { useUserStore } from "../../../state/useUserStore";
import CommonModel from "./commonModel";
import Select from "react-select/async";
import { UserService } from "../../../apiService/userService";

const styles = {
    menuList(base, props) {
        return {
            ...base,
            background: "#7470BA",
            color: "black",
        };
    },
    control(base, props) {
        return {
            ...base,
            background: "#251F59",
            border: "1px solid #4c42a7",
        };
    },
    input(base, props) {
        return {
            ...base,
            color: "white",
            "::placeholder": {
                color: "white",
            },
        };
    },
    singleValue(base, props) {
        return { ...base, color: "white" };
    },
};
export default function InviteUser() {
    const { setStep, setInvite } = useChallengeCreate();
    const [users, setUsers] = useState([]);
    const filterData = (data) => {
        return data.map((val) => ({
            label: val.bragname,
            value: val._id,
        }));
    };
    const handleSearch = async () => {
        const response = await UserService.searchUser("");
        const result = filterData(response);
        setUsers(result);
    };
    useEffect(() => {
        handleSearch();
    }, []);

    const promiseOptions = async (inputValue: string) => {
        const response = await UserService.searchUser(inputValue);
        const result = filterData(response);
        return result;
    };

    return (
        <CommonModel
            title="Invite User"
            desc=""
            buttonText="Submit Challenge"
            onClick={() => setStep("SUCCESS_MESSAGE")}>
            <div className="">
                <label className="text-sm">User</label>
                <Select
                    defaultOptions={users}
                    cacheOptions
                    loadOptions={promiseOptions}
                    styles={styles}
                    onChange={(value) => {
                        setInvite(value.value);
                    }}
                />
            </div>
        </CommonModel>
    );
}
