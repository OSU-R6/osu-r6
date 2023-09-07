function MiniBanner(props) {
    return (
        <div className="scale-75">
            <div className="py-1 bg-osu-shine" />
            <div className="banner-block">
                <p className="bg-osu-shine banner-text text-6xl md:text-7xl xl:text-8xl 2xl:text:9xl">{props.children}</p>
            </div>
            <div className="py-1 bg-osu-shine" />
        </div>
    )
} export default MiniBanner;