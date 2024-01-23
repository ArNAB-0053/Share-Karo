const ProgressBar = ({ progress, className }) => {
    return (
        <div className={className} >
            <div className={` h-16 sm:rounded-md rounded-none bg-[#07BC0C] flex items-center justify-center text-white font-[Montserrat] text-sm font-bold`} style={{ width: `${progress === '0%' ? '0%' : progress}` }}>
                {progress}
            </div>
        </div>
    )
}

export default ProgressBar
