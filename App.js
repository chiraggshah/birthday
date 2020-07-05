import React, { useEffect, useState } from 'react';

import CardList from './components/CardList';
import { CARDS, BIRTHDATE, TIMEZONE } from './configurations';
import {
  configurePushNotifications,
  schedulePushNotifications,
} from './configurePushNotifications';

const getCardsWithLockedStatus = (unlockedIds) =>
  CARDS.map((card) => ({ ...card, locked: !unlockedIds.includes(card.id) }));

const getUnlockedCardIds = (currentDateTime) =>
  CARDS.reduce((unlockedIds, card) => {
    const unlockDate = new Date(`${BIRTHDATE}T${card.unlockTime}+05:30`);
    return unlockDate < currentDateTime
      ? [...unlockedIds, card.id]
      : unlockedIds;
  }, []);

const App = () => {
  const [unlockedIds, setUnlockedIds] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    configurePushNotifications(this.refreshState);
    setTimeout(schedulePushNotifications, 5000);
  }, []);

  useEffect(() => {
    this.refreshState();
  }, []);

  refreshState = () => {
    setRefreshing(true);
    const currentDateTime = new Date();
    const unlockedIds = getUnlockedCardIds(currentDateTime);
    setUnlockedIds(unlockedIds);
    setRefreshing(false);
  };

  return (
    <CardList
      onRefresh={this.refreshState}
      refreshing={refreshing}
      data={getCardsWithLockedStatus(unlockedIds)}
    />
  );
};

export default App;
