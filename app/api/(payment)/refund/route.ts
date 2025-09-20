
import { NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe';
import { auth } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const userSession = await auth();
    const userId = userSession?.user?.id;
    if (!userId) {
      return new Response('User ID is required', { status: 400 });
    }

    const { subscriptionId } = await request.json();

    if (!subscriptionId) {
      console.warn('[Refund] Missing subscription ID in request payload.');
      return new Response('Subscription ID is required', { status: 400 });
    }

    const paymentIntentId = await getPaymentIntentId(subscriptionId);

    if (!paymentIntentId) {
      console.warn(
        `[Refund] No payment intent found for subscription ${subscriptionId}.`,
      );
      return new Response('Payment for subscription not found', { status: 400 });
    }

    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
    });

    return NextResponse.json({ refund }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

async function getPaymentIntentId(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    if (!subscription.latest_invoice) {
      console.warn(
        `[Refund] Subscription ${subscriptionId} does not have a latest invoice.`,
      );
      return null;
    }

    const latestInvoice = await stripe.invoices.retrieve(
      subscription.latest_invoice as string,
    );

    const paymentIntent = latestInvoice.payment_intent;

    if (!paymentIntent) {
      console.warn(
        `[Refund] Latest invoice ${latestInvoice.id} has no payment intent.`,
      );
      return null;
    }

    return typeof paymentIntent === 'string' ? paymentIntent : paymentIntent.id;
  } catch (error) {
    console.error('Get PaymentIntent ID error:', error);
    throw new Error('Cannot get PaymentIntent ID');
  }
}
