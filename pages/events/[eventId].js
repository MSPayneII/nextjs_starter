// import { useRouter } from "next/router";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/error-alert/error-alert";

import Head from "next/head";

import Comments from "../../components/input/comments";

const EventDetailPage = (props) => {
  // const router = useRouter();

  // const eventId = router.query.eventId;
  // const event = getEventById(eventId);
  const event = props.selectedEvent;
  // console.log(event);

  if (!event) {
    return (
      <>
        <div className="center">
          <p>Loading...</p>
        </div>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        alt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  );
};

export const getStaticProps = async (context) => {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);
  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({
    params: { eventId: event.id },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default EventDetailPage;
