import BarChart from '../components/Graph/BarChart'
import { useEventState } from '../contexts/EventProvider';
import Filter from '../components/Filter';


export default function Graph(){
    const {events} = useEventState();

    return (
        <>
            <div className='map-container'>
                <Filter />
                <div className='map-view'>
                    <BarChart data={events} />
                </div>
            </div>
        </>
    );
}