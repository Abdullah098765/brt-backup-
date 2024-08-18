export default function InviteFriend() {
    return (
        <>
            <label className="flex flex-col">
                Invite Friend or mate <span className="flex mt-2 text-xs text-gray-400">Invite will send to the user that you want to invite and it will appear on your friends screen</span>
            </label>
            <select className="select select-bordered w-full mt-3">
                <option
                    disabled
                    selected>
                    Who shot first?
                </option>
                <option>Han Solo</option>
                <option>Greedo</option>
            </select>
        </>
    );
}
