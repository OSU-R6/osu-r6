const Banner = (props) => {
    return (
        <>
            <div className={`${props.static ?  "bg-osu" : "bg-osu-shine"} py-0.5`} />
            <div className="banner-block">
                <div className={`mb-2 mt-1.5 mx-2 pb-2 text-white text-shadow-osu r6-font text-7xl xl:text-8xl 2xl:text:9xl text-center`}>{props.children}</div>
            </div>
            <div className={`${props.static ?  "bg-osu" : "bg-osu-shine"} py-0.5`} />
        </>
    )
}
export default Banner