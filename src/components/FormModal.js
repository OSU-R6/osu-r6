import {BsXLg} from 'react-icons/bs'

const FormModal = (props) => {
    return (
        <>
        <div className="modal-overlay">
            <div className="bg-black p-8 rounded-xl border-2 border-white relative mx-2">
                <button className='inline rounded-md px-2.5 py-2.5 text-sm font-semibold text-red-500 hover:text-red-700 shadow-sm absolute top-2 right-2 scale-150' id='privacyToggle' onClick={props.onClose}><BsXLg /></button>
                {props.children}
            </div>
        </div>
        </>
    )
}
export default FormModal