import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Orders from '../pages/Orders';
import Deliverymen from '../pages/Deliverymen';
import DeliverymenForm from '../pages/Deliverymen/Form';
import Recipients from '../pages/Recipients';
import RecipientsForm from '../pages/Recipients/Form';
import Problems from '../pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/orders" exact component={Orders} isPrivate />
      <Route path="/deliverymen" exact component={Deliverymen} isPrivate />
      <Route
        path="/deliverymen/new"
        exact
        component={DeliverymenForm}
        isPrivate
      />
      <Route
        path="/deliverymen/:id/edit"
        exact
        component={DeliverymenForm}
        isPrivate
      />
      <Route path="/recipients" exact component={Recipients} isPrivate />
      <Route
        path="/recipients/new"
        exact
        component={RecipientsForm}
        isPrivate
      />
      <Route
        path="/recipients/:id/edit"
        exact
        component={RecipientsForm}
        isPrivate
      />
      <Route path="/problems" exact component={Problems} isPrivate />
    </Switch>
  );
}
