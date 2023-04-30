function Banner(props) {
    return (
        <>
            <div className="py-2 bg-osu-gradient" />
            <div className="banner-block">
                <p className="bg-osu-gradient banner-text">{props.children}</p>
            </div>
            <div className="py-2 bg-osu-gradient" />
        </>
    )
} export default Banner;