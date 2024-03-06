const Confirmation = (props) => {
    return (
        <div className="modal-overlay">
            <div className="confirmation-modal-content bg-black text-white p-5 rounded-2xl border-2 m-4">
                <div className="text-white text-xl mb-4">Are you sure you want to {props.content}?</div>
                <button className="bg-osu rounded px-3 py-2" onClick={props.onConfirm}>Confirm</button>
                <button className="bg-red-800 rounded px-3 py-2 float-right" onClick={props.onCancel}>Cancel</button>
            </div>
        </div>
    )
}
export default Confirmation