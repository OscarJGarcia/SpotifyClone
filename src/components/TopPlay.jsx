import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

import 'swiper/css';
import 'swiper/css/free-mode'

const TopChartCard = ({ song, i }) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    {song.title}
  </div>
)
const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state, action) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  const topPlays = data?.slice(0, 5);
  const handlePauseClick = () => {
    dispath(playPause(false));
  };
  const handlePlayClick = () => {
    dispath(setActiveSong({ song, data, i }));
    dispath(playPause(true));
  };

  return (
    <div ref={divRef} className="xl:ml-6 ml-6 xl:mb-6 mb-6 flex-1 xl:max-w[500px] max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard song={song} i={i} key={song.key}></TopChartCard>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4">
          {topPlays?.map((song, i) => (
            <SwiperSlide
              style={{ width: '25%', height: 'auto' }}
              className="shadow-lg rounded-full animate-slideright"
              key={song?.key}>
              {
                song?.artists && song?.artists.length > 0 &&
                <Link to={`/artists/${song?.artists[0].adamid}`}>
                  <img src={song?.images?.background} alt="name" className="rounded-full w-full object-cover" />
                </Link>
              }
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )

}
export default TopPlay;
