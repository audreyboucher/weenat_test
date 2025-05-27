import React, { FC, FormEventHandler, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { MdClose, MdDeleteOutline } from 'react-icons/md';

import { useAppDispatch } from '../../store';
import { selectOpenedDay, createEvent, removeEvent, unselectDay } from '../../store/slice';
import { selectEventsBySelectedDay } from '../../store/selectors';
import { Event as EventType } from '../../store/types';

import { toDateFormat, parseDate } from '../../utils/dates';

import { Button, ButtonType, Input, Icon } from '../ui';

import styles from './DayOverview.module.scss';
import colors from '../../styles/_colors.scss';

type EventProps = EventType;

const Event: FC<EventProps> = ({ id, name }) => {
  const dispatch = useAppDispatch();

  return (
    <li>
      <span>{ name }</span>

      <Button theme={ButtonType.Secondary} onClick={() => dispatch(removeEvent({ id }))} aria-label="delete the event">
        <Icon icon={MdDeleteOutline} size={16} />
      </Button>
    </li>
  )
};

const DayOverview: FC = () => {
  const dayPlaceholder = parseDate(new Date());

  const day = useSelector(selectOpenedDay);
  const events = useSelector(selectEventsBySelectedDay);

  const dispatch = useAppDispatch();

  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const submitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setSuccess(false);

    if (value && day) {
      dispatch(createEvent({ name: value, day }));
      setValue('');
      setSuccess(true);
    } else setError(!day ? "No day is selected" : "A name is required");
  };

  useEffect(() => {
    if (success) {
      const id = setTimeout(() => setSuccess(false), 5000);
      return () => clearTimeout(id);
    }
  }, [success]);

  return (
    <aside className={classNames(styles.container, { [styles.opened]: !!day })}>
      <span className={styles.overlay} onClick={() => dispatch(unselectDay())} aria-label="close"></span>

      <div className={styles.contentContainer}>
        <span className={styles.close} onClick={() => dispatch(unselectDay())} aria-label="close">
          <Icon icon={MdClose} size={24} color={colors.closeIcon} />
        </span>

        <h2>{ toDateFormat(day || dayPlaceholder) }</h2>

        { !!events.length && (
          <ul className={styles.eventsContainer}>
            { events.map((event, index) => <Event {...event} key={index} />) }
          </ul>
        ) }

        <p className={classNames(styles.success, { [styles.displayed]: success })}>Your event has successfully been created!</p>

        <form onSubmit={submitForm}>
          <h3>Create a new event</h3>
          <Input
            htmlFor="eventName"
            label="Type your event's name..."
            type="text"
            value={value}
            error={error}
            onChange={(event) => {
              setValue(event.currentTarget.value);
              setError('');
            }}
          />
          <Button theme={ButtonType.Primary} text="Create an event" type="submit" aria-label="create an event" />
        </form>
      </div>
    </aside>
  );
};

export default DayOverview;
