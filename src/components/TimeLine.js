import { useTheme } from "@emotion/react";
import { useEventState } from "../contexts/EventProvider"

export default function TimeLine() {
    const theme = useTheme();
    const { events } = useEventState();

    const minDate = Math.min(...events.map((e) => Math.min(new Date(e.date_start), new Date(e.date_end))));
    const maxDate = Math.max(...events.map((e) => Math.max(new Date(e.date_start), new Date(e.date_end))));

    return (<div className='timeline-overlay' style={({ backgroundColor: theme.palette.background.default })}>
        <p>From: {maxDate.toString()}</p>
        <p>To: {minDate.toString()}</p>
    </div>)
}