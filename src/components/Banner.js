const Banner = (props) => {
    return (
        <>
            <div className={`${props.static ?  "bg-osu" : "bg-osu-shine"} py-1`} />
            <div className="banner-block">
                <div className={`${props.static ?  "bg-osu" : "bg-osu-shine"} banner-text text-6xl md:text-7xl xl:text-8xl 2xl:text:9xl mb-2 mx-2`}>{props.children}</div>
            </div>
            <div className={`${props.static ?  "bg-osu" : "bg-osu-shine"} py-1`} />
        </>
    )
}
export default Banner