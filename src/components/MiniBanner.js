function MiniBanner(props) {
    return (
        <div className="scale-75">
            <div className="py-1 bg-osu-shine" />
            <div className="banner-block">
                <p className="bg-osu-shine banner-text">{props.children}</p>
            </div>
            <div className="py-1 bg-osu-shine" />
        </div>
    )
} export default MiniBanner;