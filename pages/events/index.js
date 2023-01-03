import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/EventList";

import EventsSearch from "../../components/events/EventsSearch";

import { useRouter } from "next/router";

import Head from "next/head";

const AllEventsPage = (props) => {
  const events = getAllEvents();

  const router = useRouter();

  const FindEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <EventsSearch FindEventsHandler={FindEventsHandler} />
      <EventList items={props.events} />
    </>
  );
};

export const getStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
};

export default AllEventsPage;
