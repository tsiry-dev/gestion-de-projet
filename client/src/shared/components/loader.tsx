import { ThreeDots } from 'react-loader-spinner'


export default function Loader() {
    return <div className="flex justify-center items-center h-full fixed top-0 left-0 w-full">
        <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#2d5aa8"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    </div>
}