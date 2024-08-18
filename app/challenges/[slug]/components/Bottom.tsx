import Comment from "./Comment";
import { BOTTOM_ACTIONS } from "./bottomOptions";

export default function Bottom() {
    return (
        <div className="text-white m-4">
            <div className="flex gap-4 flex-wrap mb-4">
                {BOTTOM_ACTIONS.map((item) => (
                    <span
                        key={item.name}
                        className="p-3 px-10 rounded-full bg-white/5 flex gap-2">
                        <span className="flex w-5 h-5">{item.icon}</span>
                        <span>{item.name}</span>
                        {item.value && <span className="text-[10px] bg-white/10 p-1 rounded-full">{item.value}</span>}
                    </span>
                ))}
            </div>
            <Comment />
        </div>
    );
}
