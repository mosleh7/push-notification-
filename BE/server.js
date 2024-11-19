
const express = require('express');
const bodyParser = require('body-parser');
const webPush = require('web-push');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const VAPID_PUBLIC_KEY = 'BHsscdk5PUWLDjaaDyHvN5jU1vobhdrA40mVFN6nwg_qSfix4WYbHZIA3zju9VQIn5-gko6zKvseYKb23gVXWeM';
const VAPID_PRIVATE_KEY = 'Z_1HcHWI361Rsm0qXb8GJD9SKS_IyXBarIqdfAqzAV0';

webPush.setVapidDetails(
  'mailto:mohamed.mosleh@hypercell.net',
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

let subscriptions = [];

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

app.post('/send-notification', (req, res) => {
  const notificationPayload = {
    message: 'Angular Push Notification - This is a test push notification'
  };

  const promises = [];
  subscriptions.forEach(subscription => {
    promises.push(
      webPush.sendNotification(subscription, JSON.stringify(notificationPayload))
    );
  });

  Promise.all(promises).then(() => res.status(200).json({ message: 'Notification sent!' }))
    .catch(err => {
      console.error('Error sending notification', err);
      res.sendStatus(500);
    });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
