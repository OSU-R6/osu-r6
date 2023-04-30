function Banner(props) {
    return (
        <>
            <div className="py-2 bg-osu-shine" />
            <div className="banner-block">
                <p className="bg-osu-shine banner-text">{props.children}</p>
            </div>
            <div className="py-2 bg-osu-shine" />
        </>
    )
} export default Banner;