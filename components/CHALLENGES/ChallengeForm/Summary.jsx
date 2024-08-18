export default function Summary() {
    return (
        <div className="grid grid-cols-3">
            <div className="col-span-2">
                <p>Title</p>
                <p>Description</p>
                <p>Category</p>
            </div>
            <div className="w-full h-48 border rounded-lg"></div>
        </div>
    );
}
