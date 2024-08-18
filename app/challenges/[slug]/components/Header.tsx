export default function Header() {
    let avatars = [0, 1];
    return (
        <div className="text-white bg-transparent lg:bg-primary w-full flex justify-between p-4 py-6 absolute lg:static top-0 left-0">
            <div>
                <p className="font-bold lg:text-2xl text-lg">Game Of War</p>
                <div className="flex items-center gap-2">
                    <div className="avatar-group -space-x-3 rtl:space-x-reverse mt-1">
                        {avatars.map((avatar) => (
                            <div
                                key={avatar}
                                className="avatar border-none">
                                <div className="w-4 lg:w-6">
                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <span className="text-textSecondary text-xs lg:text-base">+2 Participants</span>
                </div>
            </div>
            <button className="bg-backgroundThird rounded-full px-4 border border-white font-bold hidden lg:flex justify-center items-center">Request to join Challenge</button>
            <button className="bg-backgroundThird rounded-full px-2 h-6 border border-white text-sm font-bold flex lg:hidden">Participating</button>
        </div>
    );
}
