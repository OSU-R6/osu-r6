function ErrorMessage(props) {
    return (
        <p className="text-red-500 text-xs italic mt-3">{props.children}</p>
    )
}

export default ErrorMessage