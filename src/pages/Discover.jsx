import { useDispatch, useSelector } from 'react-redux';
import { genres } from '../assets/constants';
import { SongCard, Error, Loader } from "../components";
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
const Discover = () => {
    const dispatch = useDispatch();
    const { data, isFetching, error } = useGetTopChartsQuery();
    const genreTitle = 'Pop';
    if (isFetching) return <Loader title="Loading songs"></Loader>;
    if (error) return <Error></Error>;

    return (<div className="flex flex-col">
        <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
            <h2 className="font-bold text-3xl text-white">Discover {genreTitle}</h2>
            <select className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5" value=""
                onChange={() => {
                }}>
                {genres?.map((genre) => <option value={genre.value} key={genre.value}>{genre.title}</option>)}
            </select>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-start gap-8">
            {data?.map((song, i) => (
                <SongCard key={song.key} song={song} i={i}></SongCard>
            ))}
        </div>
    </div>)
};

export default Discover;
