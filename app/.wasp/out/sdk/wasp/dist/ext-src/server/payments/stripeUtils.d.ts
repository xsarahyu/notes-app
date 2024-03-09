import Stripe from 'stripe';
export declare function fetchStripeCustomer(customerEmail: string): Promise<Stripe.Customer>;
export declare function createStripeCheckoutSession({ priceId, customerId }: {
    priceId: string;
    customerId: string;
}): Promise<Stripe.Response<Stripe.Checkout.Session>>;
