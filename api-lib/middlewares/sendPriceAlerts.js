import { findAlerts } from '@/api-lib/db/alert';
import { getMongoDb } from '@/api-lib/mongodb';
import { sendMail } from '@/api-lib/mail';

export async function sendPriceAlerts(oldPost, newPost) {
  // if the price difference is at least $1
  if (Math.abs(parseFloat(newPost.price) - parseFloat(oldPost.price)) >= 1) {
    // send the alerts

    const db = await getMongoDb();

    // fetch the latest 100 alerts
    // @TODO loop through all alerts, group by email
    const alerts = await findAlerts(db, newPost._id, undefined, 100);

    if (!alerts || alerts.length === 0) {
      return;
    }

    alerts.forEach((alert) => {
      const message = `Product ${newPost.name} price decrease, from ${oldPost.price} to ${newPost.price}`;
      console.log('Alert sent to ' + alert.email + ': ' + message);
      sendMail({
        from: 'nofomopls@gmail.com',
        to: alert.email,
        subject: 'New Price Update',
        html: message,
      });
    });
  }
}
